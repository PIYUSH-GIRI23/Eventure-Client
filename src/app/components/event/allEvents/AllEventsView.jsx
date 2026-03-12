"use client"

import React from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { FiHeart, FiBookmark } from "react-icons/fi"
import { FaHeart, FaBookmark } from "react-icons/fa"
import formatDateTime from "@/app/utils/formatDateTime"
import LoadingSpinner from "@/app/components/LoadingSpinner"

const AllEventsView = ({
    events,
    loading,
    error,
    isLoggedIn,
    likedEvents,
    bookmarkedEvents,
    onLikeEvent,
    onUnlikeEvent,
    onBookmarkEvent,
    onUnbookmarkEvent,
    onRefresh,
    activeTheme
}) => {
    const router = useRouter()

    const truncateDescription = (description, wordLimit = 5) => {
        if (!description) return ""
        const words = description.split(" ")
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(" ") + "..."
        }
        return description
    }

    const handleLikeClick = (e, eventId) => {
        e.preventDefault()
        if (!isLoggedIn) return
        if (likedEvents.has(eventId)) {
            onUnlikeEvent(eventId)
        } else {
            onLikeEvent(eventId)
        }
    }

    const handleBookmarkClick = (e, eventId) => {
        e.preventDefault()
        if (!isLoggedIn) return
        if (bookmarkedEvents.has(eventId)) {
            onUnbookmarkEvent(eventId)
        } else {
            onBookmarkEvent(eventId)
        }
    }

    const handleManagerClick = (e, username) => {
        e.stopPropagation()
        router.push(`/manager/${username}`)
    }

    return (
        <div className="min-h-[89vh] md:h-[89vh] overflow-y-auto w-full" style={{ backgroundColor: activeTheme.bgColor }}>
            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">

                {/* Loading State */}
                {loading && <LoadingSpinner />}

                {/* Events Grid */}
                {!loading && events.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16">
                        <p className="text-lg font-medium" style={{ color: activeTheme.textColor }}>No events found</p>
                        <p className="text-sm mt-2" style={{ color: activeTheme.textColor, opacity: 0.7 }}>Events will appear here as they are created</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {events.map((event) => (
                            <div
                                key={event._id}
                                className="group"
                            >
                                <div className="rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col h-full" style={{ backgroundColor: activeTheme.divColor }}>
                                    {/* Image Container */}
                                    <Link
                                        href={`/event/${event._id}`}
                                        className="relative overflow-hidden h-48 w-full block"
                                        style={{ backgroundColor: activeTheme.divColor2 }}
                                    >
                                        <Image
                                            src={event.banner}
                                            alt={event.event_name}
                                            fill
                                            className="object-contain"
                                            quality={75}
                                            priority={false}
                                        />

                                        {/* Action Buttons (Like & Bookmark) */}
                                        <div className="absolute top-3 right-3 flex gap-2">
                                            {/* Like Button */}
                                            <button
                                                onClick={(e) => handleLikeClick(e, event._id)}
                                                disabled={!isLoggedIn}
                                                className={`p-2 rounded-full transition-all duration-200 shadow-md hover:shadow-lg ${
                                                    likedEvents.has(event._id)
                                                        ? "text-white"
                                                        : "hover:opacity-80"
                                                } ${!isLoggedIn ? "opacity-50 cursor-not-allowed" : ""}`}
                                                style={likedEvents.has(event._id) ? { backgroundColor: activeTheme.textColor2 } : { backgroundColor: activeTheme.divColor, color: activeTheme.textColor }}
                                            >
                                                {likedEvents.has(event._id) ? (
                                                    <FaHeart size={20} />
                                                ) : (
                                                    <FiHeart size={20} />
                                                )}
                                            </button>

                                            {/* Bookmark Button */}
                                            <button
                                                onClick={(e) => handleBookmarkClick(e, event._id)}
                                                disabled={!isLoggedIn}
                                                className={`p-2 rounded-full transition-all duration-200 shadow-md hover:shadow-lg ${
                                                    bookmarkedEvents.has(event._id)
                                                        ? "text-white"
                                                        : "hover:opacity-80"
                                                } ${!isLoggedIn ? "opacity-50 cursor-not-allowed" : ""}`}
                                                style={bookmarkedEvents.has(event._id) ? { backgroundColor: activeTheme.textColor2 } : { backgroundColor: activeTheme.divColor, color: activeTheme.textColor }}
                                            >
                                                {bookmarkedEvents.has(event._id) ? (
                                                    <FaBookmark size={20} />
                                                ) : (
                                                    <FiBookmark size={20} />
                                                )}
                                            </button>
                                        </div>

                                    </Link>

                                    {/* Card Content */}
                                    <div className="p-4 md:p-5 flex-1 flex flex-col">
                                        {/* Event Name & DateTime */}
                                        <div className="mb-2">
                                            <h3 className="text-lg md:text-xl font-bold mb-1 line-clamp-2" style={{ color: activeTheme.textColor }}>
                                                {event.event_name}
                                            </h3>
                                            <p className="text-sm font-medium" style={{ color: activeTheme.textColor2 }}>
                                                {event.start_date} • {event.start_time}
                                            </p>
                                        </div>

                                        {/* Title */}
                                        <p className="text-sm md:text-base font-semibold mb-2 line-clamp-1" style={{ color: activeTheme.textColor }}>
                                            {event.title}
                                        </p>

                                        {/* Description */}
                                        <p className="text-sm mb-3 line-clamp-2" style={{ color: activeTheme.textColor2, opacity: 0.8 }}>
                                            {truncateDescription(event.description)}
                                        </p>

                                        {/* Divider */}
                                        <div className="my-3" style={{ borderTopColor: activeTheme.divColor2, borderTopWidth: '1px' }}></div>

                                        {/* Manager Info */}
                                        <div className="mb-3">
                                            <div
                                                onClick={(e) => handleManagerClick(e, event.manager_username)}
                                                className="text-xs md:text-sm hover:opacity-80 transition-colors duration-200 cursor-pointer"
                                                style={{ color: activeTheme.textColor2 }}
                                            >
                                                <p className="font-semibold">
                                                    Manager : {event.manager_name} <span style={{ color: activeTheme.textColor, opacity: 0.7 }}>@{event.manager_username}</span>
                                                </p>
                                            </div>
                                        </div>

                                        {/* Created At */}
                                        <p className="text-xs mb-4" style={{ color: activeTheme.textColor, opacity: 0.6 }}>
                                            Created: {formatDateTime(event.created_at)}
                                        </p>

                                        {/* Stats */}
                                        <div className="flex gap-4 mb-4 text-xs" style={{ color: activeTheme.textColor2 }}>
                                            <div className="flex items-center gap-1">
                                                <FaHeart size={14} />
                                                <span>{event.likes_count || 0}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <FaBookmark size={14} />
                                                <span>{event.bookmark_count || 0}</span>
                                            </div>
                                        </div>

                                        {/* View More Button */}
                                        <div className="flex gap-2 mt-auto">
                                            <Link
                                                href={`/event/${event._id}`}
                                                className="flex-1 px-4 py-2 text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg hover:opacity-80 block text-center"
                                                style={{ backgroundColor: activeTheme.textColor2 }}
                                            >
                                                View
                                            </Link>
                                            <Link
                                                href={`/event/${event._id}`}
                                                className="flex-1 px-4 py-2 text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg hover:opacity-80 block text-center"
                                                style={{ backgroundColor: activeTheme.textColor2 }}
                                            >
                                                Register
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
export default AllEventsView
