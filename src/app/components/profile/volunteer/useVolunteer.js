"use client"

import { useCallback, useEffect, useState, useSyncExternalStore } from "react"
import { useParams } from "next/navigation"
import { useSelector } from "react-redux"
import { volunteerProfileAction } from "@/app/actions/userAction"
import { performLogout } from "@/app/utils/logoutUtil"
import colorSchemeOptions from "@/app/state/colorschemeOptions"

export const useVolunteer = () => {
    const isClient = useSyncExternalStore(
        () => () => {},
        () => true,
        () => false
    )

    const params = useParams()
    const username = params.id
    const colorId = useSelector((state) => state.colorscheme.id)
    
    const [volunteer, setVolunteer] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [selectedEventIndex, setSelectedEventIndex] = useState(null)

    const activeTheme = colorSchemeOptions.find((option) => option.id === colorId) ?? colorSchemeOptions[0]

    const fetchVolunteerProfile = useCallback(async () => {
        if (!isClient || !username) return

        setLoading(true)
        setError(null)

        try {
            const accessToken = localStorage.getItem("access_token")
            const refreshToken = localStorage.getItem("refresh_token")

            const response = await volunteerProfileAction({
                username: username,
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
                setError(response.message || "Failed to fetch profile")
                return
            }

            setVolunteer(response.data.events)
        } catch (err) {
            console.error("Error fetching volunteer profile:", err)
            setError("An error occurred while fetching profile")
        } finally {
            setLoading(false)
        }
    }, [isClient, username])

    useEffect(() => {
        if (isClient && username) {
            fetchVolunteerProfile()
        }
    }, [isClient, username, fetchVolunteerProfile])

    return {
        isClient,
        volunteer,
        loading,
        error,
        activeTheme,
        selectedEventIndex,
        setSelectedEventIndex
    }
}
