"use client"

import { useEffect, useState, useSyncExternalStore, useCallback } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getRegisteredEventsAction, rateEventAction, derateEventAction, bookmarkEventAction, debookmarkEventAction } from "@/app/actions/eventAction"
import { updateEventLiked, updateEventBookmarked, forceRefresh } from "@/app/state/slices/eventsSlice"
import { performLogout } from "@/app/utils/logoutUtil"

export const useRegisteredEvents = () => {
    const isClient = useSyncExternalStore(
        () => () => {},
        () => true,
        () => false
    )

    const dispatch = useDispatch()
    const { isLoggedIn, type } = useSelector((state) => state.userdata)
    const [registeredEvents, setRegisteredEvents] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    // Fetch registered events
    const fetchRegisteredEvents = useCallback(async () => {
        if (!isClient || !isLoggedIn) return

        setLoading(true)
        setError(null)

        try {
            const accessToken = localStorage.getItem("access_token")
            const refreshToken = localStorage.getItem("refresh_token")

            const payload = {
                access_token: accessToken,
                refresh_token: refreshToken,
                type: 'volunteer'
            }

            const response = await getRegisteredEventsAction(payload)
            if (!response.success) {
                if (response.statusCode === 401 || response.statusCode === 403) {
                    performLogout()
                    return
                }
                setError(response.message || "Failed to fetch registered events")
                return
            }

            // Store new tokens if they were refreshed
            if (response.new_access_token) {
                localStorage.setItem("access_token", response.new_access_token)
            }
            if (response.new_refresh_token) {
                localStorage.setItem("refresh_token", response.new_refresh_token)
            }

            setRegisteredEvents(response.data.events || [])
        } catch (err) {
            setError(err.message || "An error occurred while fetching registered events")
        } finally {
            setLoading(false)
        }
    }, [isClient, isLoggedIn])

    // Initial fetch on component mount
    useEffect(() => {
        if (isClient && isLoggedIn && type === 'volunteer') {
            fetchRegisteredEvents()
        }
    }, [isClient, isLoggedIn, type, fetchRegisteredEvents])

    // Like event
    const handleLikeEvent = async (eventId) => {
        if (!isClient || !isLoggedIn) return

        try {
            const accessToken = localStorage.getItem("access_token")
            const refreshToken = localStorage.getItem("refresh_token")

            const payload = {
                event_id: eventId,
                type: type,
                access_token: accessToken,
                refresh_token: refreshToken
            }

            const response = await rateEventAction(payload)

            if (!response.success) {
                if (response.statusCode === 401 || response.statusCode === 403) {
                    performLogout()
                    return
                }
                setError(response.message || "Failed to like event")
                return
            }

            if (response.new_access_token) {
                localStorage.setItem("access_token", response.new_access_token)
            }
            if (response.new_refresh_token) {
                localStorage.setItem("refresh_token", response.new_refresh_token)
            }

            // Update Redux state and invalidate cache so home page shows changes
            dispatch(updateEventLiked({ eventId, isLiked: true }))
            dispatch(forceRefresh())
            
            fetchRegisteredEvents()
        } catch (err) {
            setError(err.message || "An error occurred while liking the event")
        }
    }

    // Unlike event
    const handleUnlikeEvent = async (eventId) => {
        if (!isClient || !isLoggedIn) return

        try {
            const accessToken = localStorage.getItem("access_token")
            const refreshToken = localStorage.getItem("refresh_token")

            const payload = {
                event_id: eventId,
                type: type,
                access_token: accessToken,
                refresh_token: refreshToken
            }

            const response = await derateEventAction(payload)

            if (!response.success) {
                if (response.statusCode === 401 || response.statusCode === 403) {
                    performLogout()
                    return
                }
                setError(response.message || "Failed to unlike event")
                return
            }

            if (response.new_access_token) {
                localStorage.setItem("access_token", response.new_access_token)
            }
            if (response.new_refresh_token) {
                localStorage.setItem("refresh_token", response.new_refresh_token)
            }

            // Update Redux state and invalidate cache so home page shows changes
            dispatch(updateEventLiked({ eventId, isLiked: false }))
            dispatch(forceRefresh())
            
            fetchRegisteredEvents()
        } catch (err) {
            setError(err.message || "An error occurred while unliking the event")
        }
    }

    // Bookmark event
    const handleBookmarkEvent = async (eventId) => {
        if (!isClient || !isLoggedIn) return

        try {
            const accessToken = localStorage.getItem("access_token")
            const refreshToken = localStorage.getItem("refresh_token")

            const payload = {
                event_id: eventId,
                type: type,
                access_token: accessToken,
                refresh_token: refreshToken
            }

            const response = await bookmarkEventAction(payload)

            if (!response.success) {
                if (response.statusCode === 401 || response.statusCode === 403) {
                    performLogout()
                    return
                }
                setError(response.message || "Failed to bookmark event")
                return
            }

            if (response.new_access_token) {
                localStorage.setItem("access_token", response.new_access_token)
            }
            if (response.new_refresh_token) {
                localStorage.setItem("refresh_token", response.new_refresh_token)
            }

            // Update Redux state and invalidate cache so home page shows changes
            dispatch(updateEventBookmarked({ eventId, isBookmarked: true }))
            dispatch(forceRefresh())
            
            fetchRegisteredEvents()
        } catch (err) {
            setError(err.message || "An error occurred while bookmarking the event")
        }
    }

    // Unbookmark event
    const handleUnbookmarkEvent = async (eventId) => {
        if (!isClient || !isLoggedIn) return

        try {
            const accessToken = localStorage.getItem("access_token")
            const refreshToken = localStorage.getItem("refresh_token")

            const payload = {
                event_id: eventId,
                type: type,
                access_token: accessToken,
                refresh_token: refreshToken
            }

            const response = await debookmarkEventAction(payload)

            if (!response.success) {
                if (response.statusCode === 401 || response.statusCode === 403) {
                    performLogout()
                    return
                }
                setError(response.message || "Failed to unbookmark event")
                return
            }

            if (response.new_access_token) {
                localStorage.setItem("access_token", response.new_access_token)
            }
            if (response.new_refresh_token) {
                localStorage.setItem("refresh_token", response.new_refresh_token)
            }

            // Update Redux state and invalidate cache so home page shows changes
            dispatch(updateEventBookmarked({ eventId, isBookmarked: false }))
            dispatch(forceRefresh())
            
            fetchRegisteredEvents()
        } catch (err) {
            setError(err.message || "An error occurred while unbookmarking the event")
        }
    }

    return {
        isClient,
        events: registeredEvents,
        loading,
        error,
        isLoggedIn,
        fetchRegisteredEvents,
        handleLikeEvent,
        handleUnlikeEvent,
        handleBookmarkEvent,
        handleUnbookmarkEvent
    }
}
