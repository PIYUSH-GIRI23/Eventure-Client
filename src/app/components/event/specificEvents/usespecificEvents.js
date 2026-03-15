"use client"

import { useEffect, useState, useSyncExternalStore, useCallback } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useRouter, useParams } from "next/navigation"
import { getSpecificEventAction, rateEventAction, derateEventAction, bookmarkEventAction, debookmarkEventAction, registerToEventAction, deregisterFromEventAction } from "@/app/actions/eventAction"
import { performLogout } from "@/app/utils/logoutUtil"

export const useSpecificEvents = () => {
    const isClient = useSyncExternalStore(
        () => () => {},
        () => true,
        () => false
    )

    const router = useRouter()
    const params = useParams()
    const eventId = params?.id

    const dispatch = useDispatch()
    const { isLoggedIn, username, type } = useSelector((state) => state.userdata)

    const [event, setEvent] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [isLiked, setIsLiked] = useState(false)
    const [isBookmarked, setIsBookmarked] = useState(false)
    const [isRegistered, setIsRegistered] = useState(false)
    const [activeTab, setActiveTab] = useState('details') // 'details', 'images', 'videos'
    const [showLikesModal, setShowLikesModal] = useState(false)
    const [showBookmarkedModal, setShowBookmarkedModal] = useState(false)
    const [showDetailsModal, setShowDetailsModal] = useState(false)
    const [showVolunteersModal, setShowVolunteersModal] = useState(false)
    const [showImageModal, setShowImageModal] = useState(false)
    const [showVideoModal, setShowVideoModal] = useState(false)

    // Fetch specific event
    const fetchSpecificEvent = useCallback(async () => {
        if (!isClient || !eventId) return

        setLoading(true)
        setError(null)

        try {
            const accessToken = localStorage.getItem("access_token")
            const refreshToken = localStorage.getItem("refresh_token")

            const payload = {
                eventId: eventId,
                access_token: accessToken,
                refresh_token: refreshToken
            }

            const response = await getSpecificEventAction(payload)

            if (!response.success) {
                if (response.statusCode === 401 || response.statusCode === 403) {
                    performLogout()
                    router.push('/login')
                    return
                }
                setError(response.message || "Failed to fetch event details")
                return
            }

            // Store new tokens if they were refreshed
            if (response.new_access_token) {
                localStorage.setItem("access_token", response.new_access_token)
            }
            if (response.new_refresh_token) {
                localStorage.setItem("refresh_token", response.new_refresh_token)
            }

            const fetchedEvent = response.data.event
            setEvent(fetchedEvent)

            // Check if event is liked, bookmarked, and registered by current user
            if (isLoggedIn && username) {
                const liked = fetchedEvent.likes && fetchedEvent.likes.some((like) => like.username === username)
                const bookmarked = fetchedEvent.bookmarked && fetchedEvent.bookmarked.some((bookmark) => bookmark.username === username)
                const registered = fetchedEvent.volunteers && fetchedEvent.volunteers.some((vol) => vol.username === username)

                setIsLiked(liked)
                setIsBookmarked(bookmarked)
                setIsRegistered(registered)
            }
        } catch (err) {
            setError(err.message || "An error occurred while fetching event details")
        } finally {
            setLoading(false)
        }
    }, [isClient, eventId, isLoggedIn, username, router])

    // Initial fetch on component mount
    useEffect(() => {
        if (isClient && isLoggedIn) {
            fetchSpecificEvent()
        }
    }, [isClient, isLoggedIn, fetchSpecificEvent])

    // Like event
    const handleLikeEvent = async () => {
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
                    router.push('/login')
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

            setIsLiked(true)
            setEvent((prev) => ({
                ...prev,
                likes_count: (prev.likes_count || 0) + 1,
                likes: [...(prev.likes || []), { username, liked_time: Date.now(), type }]
            }))
        } catch (err) {
            setError(err.message || "An error occurred while liking the event")
        }
    }

    // Unlike event
    const handleUnlikeEvent = async () => {
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
                    router.push('/login')
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

            setIsLiked(false)
            setEvent((prev) => ({
                ...prev,
                likes_count: Math.max(0, (prev.likes_count || 0) - 1),
                likes: (prev.likes || []).filter((like) => like.username !== username)
            }))
        } catch (err) {
            setError(err.message || "An error occurred while unliking the event")
        }
    }

    // Bookmark event
    const handleBookmarkEvent = async () => {
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
                    router.push('/login')
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

            setIsBookmarked(true)
            setEvent((prev) => ({
                ...prev,
                bookmark_count: (prev.bookmark_count || 0) + 1,
                bookmarked: [...(prev.bookmarked || []), { username, bookmark_time: Date.now(), type }]
            }))
        } catch (err) {
            setError(err.message || "An error occurred while bookmarking the event")
        }
    }

    // Unbookmark event
    const handleUnbookmarkEvent = async () => {
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
                    router.push('/login')
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

            setIsBookmarked(false)
            setEvent((prev) => ({
                ...prev,
                bookmark_count: Math.max(0, (prev.bookmark_count || 0) - 1),
                bookmarked: (prev.bookmarked || []).filter((bookmark) => bookmark.username !== username)
            }))
        } catch (err) {
            setError(err.message || "An error occurred while unbookmarking the event")
        }
    }

    // Register for event
    const handleRegisterEvent = async () => {
        if (!isClient || !isLoggedIn) return

        try {
            const accessToken = localStorage.getItem("access_token")
            const refreshToken = localStorage.getItem("refresh_token")

            const payload = {
                event_id: eventId,
                access_token: accessToken,
                refresh_token: refreshToken
            }

            const response = await registerToEventAction(payload)

            if (!response.success) {
                if (response.statusCode === 401 || response.statusCode === 403) {
                    performLogout()
                    router.push('/login')
                    return
                }
                setError(response.message || "Failed to register for event")
                return
            }

            // Store new tokens if they were refreshed
            if (response.new_access_token) {
                localStorage.setItem("access_token", response.new_access_token)
            }
            if (response.new_refresh_token) {
                localStorage.setItem("refresh_token", response.new_refresh_token)
            }

            setIsRegistered(true)
            // Fetch updated event data to get volunteer info
            await fetchSpecificEvent()
        } catch (err) {
            setError(err.message || "An error occurred while registering for the event")
        }
    }

    // Deregister from event
    const handleDeregisterEvent = async () => {
        if (!isClient || !isLoggedIn) return

        try {
            const accessToken = localStorage.getItem("access_token")
            const refreshToken = localStorage.getItem("refresh_token")

            const payload = {
                event_id: eventId,
                access_token: accessToken,
                refresh_token: refreshToken
            }

            const response = await deregisterFromEventAction(payload)

            if (!response.success) {
                if (response.statusCode === 401 || response.statusCode === 403) {
                    performLogout()
                    router.push('/login')
                    return
                }
                setError(response.message || "Failed to deregister from event")
                return
            }

            // Store new tokens if they were refreshed
            if (response.new_access_token) {
                localStorage.setItem("access_token", response.new_access_token)
            }
            if (response.new_refresh_token) {
                localStorage.setItem("refresh_token", response.new_refresh_token)
            }

            setIsRegistered(false)
            // Fetch updated event data to refresh volunteer count
            await fetchSpecificEvent()
        } catch (err) {
            setError(err.message || "An error occurred while deregistering from the event")
        }
    }

    // Handle image uploaded
    const handleImageUploaded = (url, publicId) => {
        if (event) {
            setEvent((prev) => ({
                ...prev,
                images: [...(prev.images || []), { url, publicId, uploaded_at: Date.now() }]
            }))
        }
    }

    // Handle video uploaded
    const handleVideoUploaded = (url, publicId) => {
        if (event) {
            setEvent((prev) => ({
                ...prev,
                videos: [...(prev.videos || []), { url, publicId, uploaded_at: Date.now() }]
            }))
        }
    }

    return {
        isClient,
        isLoggedIn,
        username,
        type,
        event,
        loading,
        error,
        isLiked,
        isBookmarked,
        isRegistered,
        activeTab,
        setActiveTab,
        showLikesModal,
        setShowLikesModal,
        showBookmarkedModal,
        setShowBookmarkedModal,
        showDetailsModal,
        setShowDetailsModal,
        showVolunteersModal,
        setShowVolunteersModal,
        showImageModal,
        setShowImageModal,
        showVideoModal,
        setShowVideoModal,
        handleLikeEvent,
        handleUnlikeEvent,
        handleBookmarkEvent,
        handleUnbookmarkEvent,
        handleRegisterEvent,
        handleDeregisterEvent,
        handleImageUploaded,
        handleVideoUploaded
    }
}
