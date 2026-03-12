"use client"

import { useEffect, useState, useSyncExternalStore, useCallback } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getAllEventsAction, rateEventAction, derateEventAction, bookmarkEventAction, debookmarkEventAction } from "@/app/actions/eventAction"
import { login } from "@/app/state/slices/userdataSlice"
import { performLogout } from "@/app/utils/logoutUtil"

export const useAllEvents = () => {
    const isClient = useSyncExternalStore(
        () => () => {},
        () => true,
        () => false
    )

    const dispatch = useDispatch()
    const { isLoggedIn, username, type } = useSelector((state) => state.userdata)

    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [likedEvents, setLikedEvents] = useState(new Set())
    const [bookmarkedEvents, setBookmarkedEvents] = useState(new Set())

    // Fetch all events
    const fetchAllEvents = useCallback(async () => {
        if (!isClient) return

        setLoading(true)
        setError(null)

        try {
            const accessToken = localStorage.getItem("access_token")
            const refreshToken = localStorage.getItem("refresh_token")

            const payload = {
                access_token: accessToken,
                refresh_token: refreshToken
            }

            const response = await getAllEventsAction(payload)
            console.log(response)
            if (!response.success) {
                if (response.statusCode === 401 || response.statusCode === 403) {
                    performLogout()
                    return
                }
                setError(response.message || "Failed to fetch events")
                return
            }

            // Store new tokens if they were refreshed
            if (response.new_access_token) {
                localStorage.setItem("access_token", response.new_access_token)
            }
            if (response.new_refresh_token) {
                localStorage.setItem("refresh_token", response.new_refresh_token)
            }

            const fetchedEvents = response.data.events || []
            setEvents(fetchedEvents)

            // Build liked and bookmarked sets
            if (isLoggedIn && username) {
                const likedSet = new Set()
                const bookmarkedSet = new Set()

                fetchedEvents.forEach((event) => {
                    if (event.likes && event.likes.some((like) => like.username === username)) {
                        likedSet.add(event._id)
                    }
                    if (event.bookmarked && event.bookmarked.some((bookmark) => bookmark.username === username)) {
                        bookmarkedSet.add(event._id)
                    }
                })

                setLikedEvents(likedSet)
                setBookmarkedEvents(bookmarkedSet)
            }
        } catch (err) {
            setError(err.message || "An error occurred while fetching events")
        } finally {
            setLoading(false)
        }
    }, [isClient, isLoggedIn, username])

    // Initial fetch on component mount
    useEffect(() => {
        if (isClient) {
            fetchAllEvents()
        }
    }, [isClient, fetchAllEvents])

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

            // Store new tokens if they were refreshed
            if (response.new_access_token) {
                localStorage.setItem("access_token", response.new_access_token)
            }
            if (response.new_refresh_token) {
                localStorage.setItem("refresh_token", response.new_refresh_token)
            }

            // Update liked events
            setLikedEvents((prev) => {
                const newSet = new Set(prev)
                newSet.add(eventId)
                return newSet
            })

            // Update events list
            setEvents((prevEvents) =>
                prevEvents.map((event) =>
                    event._id === eventId
                        ? { ...event, likes_count: (event.likes_count || 0) + 1 }
                        : event
                )
            )
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

            // Store new tokens if they were refreshed
            if (response.new_access_token) {
                localStorage.setItem("access_token", response.new_access_token)
            }
            if (response.new_refresh_token) {
                localStorage.setItem("refresh_token", response.new_refresh_token)
            }

            // Update liked events
            setLikedEvents((prev) => {
                const newSet = new Set(prev)
                newSet.delete(eventId)
                return newSet
            })

            // Update events list
            setEvents((prevEvents) =>
                prevEvents.map((event) =>
                    event._id === eventId
                        ? { ...event, likes_count: Math.max(0, (event.likes_count || 0) - 1) }
                        : event
                )
            )
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

            // Store new tokens if they were refreshed
            if (response.new_access_token) {
                localStorage.setItem("access_token", response.new_access_token)
            }
            if (response.new_refresh_token) {
                localStorage.setItem("refresh_token", response.new_refresh_token)
            }

            // Update bookmarked events
            setBookmarkedEvents((prev) => {
                const newSet = new Set(prev)
                newSet.add(eventId)
                return newSet
            })

            // Update events list
            setEvents((prevEvents) =>
                prevEvents.map((event) =>
                    event._id === eventId
                        ? { ...event, bookmark_count: (event.bookmark_count || 0) + 1 }
                        : event
                )
            )
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

            // Store new tokens if they were refreshed
            if (response.new_access_token) {
                localStorage.setItem("access_token", response.new_access_token)
            }
            if (response.new_refresh_token) {
                localStorage.setItem("refresh_token", response.new_refresh_token)
            }

            // Update bookmarked events
            setBookmarkedEvents((prev) => {
                const newSet = new Set(prev)
                newSet.delete(eventId)
                return newSet
            })

            // Update events list
            setEvents((prevEvents) =>
                prevEvents.map((event) =>
                    event._id === eventId
                        ? { ...event, bookmark_count: Math.max(0, (event.bookmark_count || 0) - 1) }
                        : event
                )
            )
        } catch (err) {
            setError(err.message || "An error occurred while unbookmarking the event")
        }
    }

    // Initial fetch on component mount
    useEffect(() => {
        if (isClient) {
            fetchAllEvents()
        }
    }, [isClient, fetchAllEvents])

    return {
        isClient,
        events,
        loading,
        error,
        isLoggedIn,
        username,
        likedEvents,
        bookmarkedEvents,
        fetchAllEvents,
        handleLikeEvent,
        handleUnlikeEvent,
        handleBookmarkEvent,
        handleUnbookmarkEvent
    }
}
