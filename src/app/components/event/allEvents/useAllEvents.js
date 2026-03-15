"use client"

import { useEffect, useState, useSyncExternalStore, useCallback } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getAllEventsAction, rateEventAction, derateEventAction, bookmarkEventAction, debookmarkEventAction } from "@/app/actions/eventAction"
import { setEventsLoading, setEventsSuccess, setEventsError, updateEventLiked, updateEventBookmarked, updateEventLikeCount, updateEventBookmarkCount } from "@/app/state/slices/eventsSlice"
import { performLogout } from "@/app/utils/logoutUtil"

export const useAllEvents = () => {
    const isClient = useSyncExternalStore(
        () => () => {},
        () => true,
        () => false
    )

    const dispatch = useDispatch()
    const { isLoggedIn, username, type } = useSelector((state) => state.userdata)
    const reduxEvents = useSelector((state) => state.events)
    
    // Convert arrays back to Sets from Redux
    const allEvents = reduxEvents.allEvents || []
    const likedEventIds = new Set(reduxEvents.likedEventIds || [])
    const bookmarkedEventIds = new Set(reduxEvents.bookmarkedEventIds || [])
    const registeredEventIds = new Set(reduxEvents.registeredEventIds || [])
    const loading = reduxEvents.loading
    const error = reduxEvents.error
    const lastFetchTime = reduxEvents.lastFetchTime

    // Fetch all events (with caching)
    const fetchAllEvents = useCallback(async (forceRefresh = false) => {
        if (!isClient) return

        // Only fetch if this is a force refresh or cache is expired (5 minute cache)
        // lastFetchTime === null means never fetched before
        const isCached = !forceRefresh && lastFetchTime && (Date.now() - lastFetchTime) < 5 * 60 * 1000
        if (isCached) {
            return
        }

        dispatch(setEventsLoading())

        try {
            const accessToken = localStorage.getItem("access_token")
            const refreshToken = localStorage.getItem("refresh_token")

            const payload = {
                access_token: accessToken,
                refresh_token: refreshToken
            }

            const response = await getAllEventsAction(payload)
            if (!response.success) {
                if (response.statusCode === 401 || response.statusCode === 403) {
                    performLogout()
                    return
                }
                dispatch(setEventsError(response.message || "Failed to fetch events"))
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

            // Build liked, bookmarked and registered sets
            let likedSet = []
            let bookmarkedSet = []
            let registeredSet = []

            if (isLoggedIn && username) {
                fetchedEvents.forEach((event) => {
                    if (event.likes && event.likes.some((like) => like.username === username)) {
                        likedSet.push(event._id)
                    }
                    if (event.bookmarked && event.bookmarked.some((bookmark) => bookmark.username === username)) {
                        bookmarkedSet.push(event._id)
                    }
                    if (event.volunteers && event.volunteers.some((volunteer) => volunteer.username === username)) {
                        registeredSet.push(event._id)
                    }
                })
            }

            dispatch(setEventsSuccess({
                events: fetchedEvents,
                likedEventIds: likedSet,
                bookmarkedEventIds: bookmarkedSet,
                registeredEventIds: registeredSet
            }))
        } catch (err) {
            dispatch(setEventsError(err.message || "An error occurred while fetching events"))
        }
    }, [isClient, isLoggedIn, username, dispatch, lastFetchTime])

    // Initial fetch on component mount
    useEffect(() => {
        if (isClient) {
            fetchAllEvents()
        }
    }, [isClient, fetchAllEvents])

    // Like event
    const handleLikeEvent = async (eventId) => {
        if (!isClient || !isLoggedIn) return

        // Optimistically update UI
        dispatch(updateEventLiked({ eventId, isLiked: true }))
        const currentLikeCount = allEvents.find(e => e._id === eventId)?.likes_count || 0
        dispatch(updateEventLikeCount({ eventId, count: currentLikeCount + 1 }))

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
                dispatch(setEventsError(response.message || "Failed to like event"))
                // Revert optimistic update on error
                dispatch(updateEventLiked({ eventId, isLiked: false }))
                dispatch(updateEventLikeCount({ eventId, count: currentLikeCount }))
                return
            }

            // Store new tokens if they were refreshed
            if (response.new_access_token) {
                localStorage.setItem("access_token", response.new_access_token)
            }
            if (response.new_refresh_token) {
                localStorage.setItem("refresh_token", response.new_refresh_token)
            }
        } catch (err) {
            dispatch(setEventsError(err.message || "An error occurred while liking the event"))
            // Revert optimistic update on error
            dispatch(updateEventLiked({ eventId, isLiked: false }))
            dispatch(updateEventLikeCount({ eventId, count: currentLikeCount }))
        }
    }

    // Unlike event
    const handleUnlikeEvent = async (eventId) => {
        if (!isClient || !isLoggedIn) return

        // Optimistically update UI
        dispatch(updateEventLiked({ eventId, isLiked: false }))
        const currentLikeCount = allEvents.find(e => e._id === eventId)?.likes_count || 0
        dispatch(updateEventLikeCount({ eventId, count: Math.max(0, currentLikeCount - 1) }))

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
                dispatch(setEventsError(response.message || "Failed to unlike event"))
                // Revert optimistic update on error
                dispatch(updateEventLiked({ eventId, isLiked: true }))
                dispatch(updateEventLikeCount({ eventId, count: currentLikeCount }))
                return
            }

            // Store new tokens if they were refreshed
            if (response.new_access_token) {
                localStorage.setItem("access_token", response.new_access_token)
            }
            if (response.new_refresh_token) {
                localStorage.setItem("refresh_token", response.new_refresh_token)
            }
        } catch (err) {
            dispatch(setEventsError(err.message || "An error occurred while unliking the event"))
            // Revert optimistic update on error
            dispatch(updateEventLiked({ eventId, isLiked: true }))
            dispatch(updateEventLikeCount({ eventId, count: currentLikeCount }))
        }
    }

    // Bookmark event
    const handleBookmarkEvent = async (eventId) => {
        if (!isClient || !isLoggedIn) return

        // Optimistically update UI
        dispatch(updateEventBookmarked({ eventId, isBookmarked: true }))
        const currentBookmarkCount = allEvents.find(e => e._id === eventId)?.bookmark_count || 0
        dispatch(updateEventBookmarkCount({ eventId, count: currentBookmarkCount + 1 }))

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
                dispatch(setEventsError(response.message || "Failed to bookmark event"))
                // Revert optimistic update on error
                dispatch(updateEventBookmarked({ eventId, isBookmarked: false }))
                dispatch(updateEventBookmarkCount({ eventId, count: currentBookmarkCount }))
                return
            }

            // Store new tokens if they were refreshed
            if (response.new_access_token) {
                localStorage.setItem("access_token", response.new_access_token)
            }
            if (response.new_refresh_token) {
                localStorage.setItem("refresh_token", response.new_refresh_token)
            }
        } catch (err) {
            dispatch(setEventsError(err.message || "An error occurred while bookmarking the event"))
            // Revert optimistic update on error
            dispatch(updateEventBookmarked({ eventId, isBookmarked: false }))
            dispatch(updateEventBookmarkCount({ eventId, count: currentBookmarkCount }))
        }
    }

    // Unbookmark event
    const handleUnbookmarkEvent = async (eventId) => {
        if (!isClient || !isLoggedIn) return

        // Optimistically update UI
        dispatch(updateEventBookmarked({ eventId, isBookmarked: false }))
        const currentBookmarkCount = allEvents.find(e => e._id === eventId)?.bookmark_count || 0
        dispatch(updateEventBookmarkCount({ eventId, count: Math.max(0, currentBookmarkCount - 1) }))

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
                dispatch(setEventsError(response.message || "Failed to unbookmark event"))
                // Revert optimistic update on error
                dispatch(updateEventBookmarked({ eventId, isBookmarked: true }))
                dispatch(updateEventBookmarkCount({ eventId, count: currentBookmarkCount }))
                return
            }

            // Store new tokens if they were refreshed
            if (response.new_access_token) {
                localStorage.setItem("access_token", response.new_access_token)
            }
            if (response.new_refresh_token) {
                localStorage.setItem("refresh_token", response.new_refresh_token)
            }
        } catch (err) {
            dispatch(setEventsError(err.message || "An error occurred while unbookmarking the event"))
            // Revert optimistic update on error
            dispatch(updateEventBookmarked({ eventId, isBookmarked: true }))
            dispatch(updateEventBookmarkCount({ eventId, count: currentBookmarkCount }))
        }
    }

    // Compute filtered arrays based on allEvents
    const likedEventsArray = allEvents.filter((event) => likedEventIds.has(event._id))
    const bookmarkedEventsArray = allEvents.filter((event) => bookmarkedEventIds.has(event._id))
    const registeredEventsArray = allEvents.filter((event) => registeredEventIds.has(event._id))

    return {
        isClient,
        allEvents,
        likedEventsArray,
        bookmarkedEventsArray,
        registeredEventsArray,
        loading,
        error,
        isLoggedIn,
        username,
        likedEventIds,
        bookmarkedEventIds,
        registeredEventIds,
        fetchAllEvents,
        handleLikeEvent,
        handleUnlikeEvent,
        handleBookmarkEvent,
        handleUnbookmarkEvent,
        type
    }
}
