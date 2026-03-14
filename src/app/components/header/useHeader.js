"use client"

import { useDispatch, useSelector } from "react-redux"
import { useMemo, useState, useRef, useEffect, useSyncExternalStore } from "react"
import { usePathname } from "next/navigation"
import colorSchemeOptions from "@/app/state/colorschemeOptions"

export const useHeader = () => {
    const isClient = useSyncExternalStore(
        () => () => {},
        () => true,
        () => false
    )

    const colorId = useSelector((state) => state.colorscheme.id)
    const { isLoggedIn, username, type } = useSelector((state) => state.userdata)
    const dispatch = useDispatch()

    const pathname = usePathname()
    const [profileOpen, setProfileOpen] = useState(false)
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [isRefreshing, setIsRefreshing] = useState(false)
    const profileRef = useRef(null)

    const activeTheme = useMemo(
        () => colorSchemeOptions.find((option) => option.id === colorId) ?? colorSchemeOptions[0],
        [colorId]
    )

    useEffect(() => {
        if (!isClient) return

        const handleClick = (e) => {
            if (profileRef.current && !profileRef.current.contains(e.target)) {
                setProfileOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClick)
        return () => document.removeEventListener("mousedown", handleClick)

    }, [isClient])

    const hiddenRoutes = ['/login', '/register']
    const isHidden = hiddenRoutes.includes(pathname)

    // Handle refresh - forces API call by bypassing cache
    const handleRefresh = async () => {
        setIsRefreshing(true)
        try {
            // Import the forceRefresh action
            const { forceRefresh } = await import("@/app/state/slices/eventsSlice")
            
            // Dispatch to clear cache
            dispatch(forceRefresh())
            
            // Get current auth tokens
            const accessToken = localStorage.getItem("access_token")
            const refreshToken = localStorage.getItem("refresh_token")

            // Import and call the action directly
            const { getAllEventsAction } = await import("@/app/actions/eventAction")
            
            const response = await getAllEventsAction({
                access_token: accessToken,
                refresh_token: refreshToken
            })

            if (response.success) {
                // Update tokens if refreshed
                if (response.new_access_token) {
                    localStorage.setItem("access_token", response.new_access_token)
                }
                if (response.new_refresh_token) {
                    localStorage.setItem("refresh_token", response.new_refresh_token)
                }
            }
        } catch (err) {
            console.error("Failed to refresh events:", err)
        } finally {
            setIsRefreshing(false)
        }
    }

    const handleCreateEventClick = () => {
        setShowCreateModal(true)
    }

    return {
        isClient,
        isLoggedIn,
        username,
        type,
        activeTheme,
        profileOpen,
        setProfileOpen,
        profileRef,
        isHidden,
        onRefresh: handleRefresh,
        isRefreshing,
        onCreateEventClick: handleCreateEventClick,
        showCreateModal,
        setShowCreateModal
    }
}
