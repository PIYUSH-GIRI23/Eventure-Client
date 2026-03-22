"use client"

import { useCallback, useEffect, useState, useSyncExternalStore } from "react"
import { useSelector } from "react-redux"
import { getManagerDetailsAction, updateManagerDetailsAction, deleteAccountAction } from "@/app/actions/userAction"
import { performLogout } from "@/app/utils/logoutUtil"
import colorSchemeOptions from "@/app/state/colorschemeOptions"

export const useManager = () => {
    const isClient = useSyncExternalStore(
        () => () => {},
        () => true,
        () => false
    )

    const { type, username } = useSelector((state) => state.userdata)
    const colorId = useSelector((state) => state.colorscheme.id)
    
    const [manager, setManager] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [activeModal, setActiveModal] = useState("profile")
    const [updating, setUpdating] = useState(false)
    const [updateError, setUpdateError] = useState(null)
    const [deleteLoading, setDeleteLoading] = useState(false)
    const [deleteError, setDeleteError] = useState(null)

    const activeTheme = colorSchemeOptions.find((option) => option.id === colorId) ?? colorSchemeOptions[0]

    const fetchManagerDetails = useCallback(async () => {
        if (!isClient || type !== "manager") return

        setLoading(true)
        setError(null)

        try {
            const accessToken = localStorage.getItem("access_token")
            const refreshToken = localStorage.getItem("refresh_token")

            const response = await getManagerDetailsAction({
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

            setManager(response.data.user)
        } catch (err) {
            console.error("Error fetching manager details:", err)
            setError("An error occurred while fetching details")
        } finally {
            setLoading(false)
        }
    }, [isClient, type])

    useEffect(() => {
        if (isClient && type === "manager") {
            fetchManagerDetails()
        }
    }, [isClient, type, fetchManagerDetails])

    const handleUpdateManager = useCallback(async (updateData) => {
        setUpdating(true)
        setUpdateError(null)

        try {
            const accessToken = localStorage.getItem("access_token")
            const refreshToken = localStorage.getItem("refresh_token")

            const response = await updateManagerDetailsAction({
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

            // Refresh manager details after update
            await fetchManagerDetails()
            // Show profile after successful update
            setActiveModal("profile")
            return true
        } catch (err) {
            console.error("Error updating manager details:", err)
            setUpdateError("An error occurred while updating details")
            return false
        } finally {
            setUpdating(false)
        }
    }, [fetchManagerDetails])

    const handleDeleteAccount = useCallback(async (password) => {
        setDeleteLoading(true)
        setDeleteError(null)

        try {
            const accessToken = localStorage.getItem("access_token")
            const refreshToken = localStorage.getItem("refresh_token")

            const response = await deleteAccountAction({
                access_token: accessToken,
                refresh_token: refreshToken,
                email: manager?.email,
                password,
                confirmPassword: password,
                type: "manager"
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
    }, [manager?.email])

    return {
        isClient,
        manager,
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
        handleUpdateManager,
        handleDeleteAccount
    }
}
