"use client"

import { useCallback, useEffect, useState, useSyncExternalStore } from "react"
import { useSelector } from "react-redux"
import { getVolunteerDetailsAction, updateVolunteerDetailsAction, deleteAccountAction } from "@/app/actions/userAction"
import { performLogout } from "@/app/utils/logoutUtil"
import colorSchemeOptions from "@/app/state/colorschemeOptions"

export const useVolunteer = () => {
    const isClient = useSyncExternalStore(
        () => () => {},
        () => true,
        () => false
    )

    const { type, username } = useSelector((state) => state.userdata)
    const colorId = useSelector((state) => state.colorscheme.id)
    
    const [volunteer, setVolunteer] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [activeModal, setActiveModal] = useState("profile")
    const [updating, setUpdating] = useState(false)
    const [updateError, setUpdateError] = useState(null)
    const [deleteLoading, setDeleteLoading] = useState(false)
    const [deleteError, setDeleteError] = useState(null)

    const activeTheme = colorSchemeOptions.find((option) => option.id === colorId) ?? colorSchemeOptions[0]

    const fetchVolunteerDetails = useCallback(async () => {
        if (!isClient || type !== "volunteer") return

        setLoading(true)
        setError(null)

        try {
            const accessToken = localStorage.getItem("access_token")
            const refreshToken = localStorage.getItem("refresh_token")

            const response = await getVolunteerDetailsAction({
                access_token: accessToken,
                refresh_token: refreshToken
            })

            // Handle token refresh
            if (response.new_access_token) {
                localStorage.setItem("access_token", response.new_access_token)
            }
            if (response.new_refresh_token) {
                localStorage.setItem("refresh_token", response.new_refresh_token)
            }

            if (!response.success) {
                // Handle 401/403 errors
                if (response.statusCode === 401 || response.statusCode === 403) {
                    performLogout()
                    setError("Session expired. Please login again.")
                    return
                }
                setError(response.message || "Failed to fetch details")
                return
            }

            setVolunteer(response.data.user)
        } catch (err) {
            console.error("Error fetching volunteer details:", err)
            setError("An error occurred while fetching details")
        } finally {
            setLoading(false)
        }
    }, [isClient, type])

    useEffect(() => {
        if (isClient && type === "volunteer") {
            fetchVolunteerDetails()
        }
    }, [isClient, type, fetchVolunteerDetails])

    const handleUpdateVolunteer = useCallback(async (updateData) => {
        setUpdating(true)
        setUpdateError(null)

        try {
            const accessToken = localStorage.getItem("access_token")
            const refreshToken = localStorage.getItem("refresh_token")

            const response = await updateVolunteerDetailsAction({
                access_token: accessToken,
                refresh_token: refreshToken,
                updateData
            })

            // Handle token refresh
            if (response.new_access_token) {
                localStorage.setItem("access_token", response.new_access_token)
            }
            if (response.new_refresh_token) {
                localStorage.setItem("refresh_token", response.new_refresh_token)
            }

            if (!response.success) {
                // Handle 401/403 errors
                if (response.statusCode === 401 || response.statusCode === 403) {
                    performLogout()
                    setUpdateError("Session expired. Please login again.")
                    return false
                }
                setUpdateError(response.message || "Failed to update details")
                return false
            }

            // Refresh volunteer details after update
            await fetchVolunteerDetails()
            // Show profile after successful update
            setActiveModal("profile")
            return true
        } catch (err) {
            console.error("Error updating volunteer details:", err)
            setUpdateError("An error occurred while updating details")
            return false
        } finally {
            setUpdating(false)
        }
    }, [fetchVolunteerDetails])

    const handleDeleteAccount = useCallback(async (password) => {
        setDeleteLoading(true)
        setDeleteError(null)

        try {
            const accessToken = localStorage.getItem("access_token")
            const refreshToken = localStorage.getItem("refresh_token")

            const response = await deleteAccountAction({
                access_token: accessToken,
                refresh_token: refreshToken,
                email: volunteer?.email,
                password,
                confirmPassword: password,
                type: "volunteer"
            })

            // Handle token refresh
            if (response.new_access_token) {
                localStorage.setItem("access_token", response.new_access_token)
            }
            if (response.new_refresh_token) {
                localStorage.setItem("refresh_token", response.new_refresh_token)
            }

            if (!response.success) {
                // Handle 401/403 errors
                if (response.statusCode === 401 || response.statusCode === 403) {
                    performLogout()
                    setDeleteError("Session expired. Please login again.")
                    return false
                }
                setDeleteError(response.message || "Failed to delete account")
                return false
            }

            // Logout user after successful deletion
            performLogout()
            return true
        } catch (err) {
            console.error("Error deleting account:", err)
            setDeleteError("An error occurred while deleting account")
            return false
        } finally {
            setDeleteLoading(false)
        }
    }, [volunteer?.email])

    return {
        isClient,
        volunteer,
        loading,
        error,
        activeTheme,
        activeModal,
        setActiveModal,
        updating,
        updateError,
        setUpdateError,
        deleteLoading,
        deleteError,
        setDeleteError,
        handleUpdateVolunteer,
        handleDeleteAccount
    }
}
