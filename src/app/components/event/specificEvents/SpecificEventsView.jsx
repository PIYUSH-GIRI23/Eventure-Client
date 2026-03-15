"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FiHeart, FiBookmark } from 'react-icons/fi'
import { FaHeart, FaBookmark } from 'react-icons/fa'
import { MdInfo } from 'react-icons/md'
import { IoClose } from 'react-icons/io5'
import { FiPlus } from 'react-icons/fi'
import formatDateTime from '@/app/utils/formatDateTime'
import Likes from './modal/Likes'
import Bookmarked from './modal/Bookmarked'
import Details from './modal/Details'
import Volunteers from './modal/Volunteers'
import ImageModal from './modal/Image'
import VideoModal from './modal/Video'

const SpecificEventsView = ({
    event,
    loading,
    error,
    isLoggedIn,
    username,
    type,
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
    onLikeEvent,
    onBookmarkEvent,
    onRegisterEvent,
    activeTheme,
    onImageUploaded,
    onVideoUploaded
}) => {
    const router = useRouter()

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: activeTheme.bgColor }}>
                <p style={{ color: activeTheme.textColor }}>{error}</p>
            </div>
        )
    }

    if (!event) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: activeTheme.bgColor }}>
                <p style={{ color: activeTheme.textColor }}>Event not found</p>
            </div>
        )
    }

    const handleLikeClick = (e) => {
        e.preventDefault()
        if (!isLoggedIn) return
        onLikeEvent()
    }

    const handleBookmarkClick = (e) => {
        e.preventDefault()
        if (!isLoggedIn) return
        onBookmarkEvent()
    }

    const handleManagerClick = () => {
        router.push(`/manager/${event.manager_username}`)
    }

    return (
        <div className="min-h-screen" style={{ backgroundColor: activeTheme.bgColor }}>
            <div className="max-w-6xl mx-auto px-4 md:px-8 py-6 md:py-8">
                {/* Banner Section */}
                <div className="mb-8">
                    <div className="relative w-full rounded-xl overflow-hidden shadow-lg mb-4" style={{ aspectRatio: '3 / 2', maxHeight: '300px' }}>
                        {event.banner ? (
                            <Image
                                src={event.banner}
                                alt={event.event_name}
                                fill
                                className="object-contain"
                                quality={95}
                                priority
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1100px"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: activeTheme.divColor2, color: activeTheme.textColor }}>
                                <span className="text-lg font-medium">No Banner Image</span>
                            </div>
                        )}

                        {/* Floating Action Buttons */}
                        <div className="absolute top-4 right-4 flex gap-2 md:gap-3">
                            {/* Like Button */}
                            <button
                                onClick={handleLikeClick}
                                disabled={!isLoggedIn}
                                className={`p-2 md:p-3 rounded-full transition-all duration-200 shadow-md hover:shadow-lg ${
                                    isLiked ? "text-white" : "hover:opacity-80"
                                } ${!isLoggedIn ? "opacity-50 cursor-not-allowed" : ""}`}
                                style={isLiked ? { backgroundColor: activeTheme.textColor2 } : { backgroundColor: activeTheme.divColor, color: activeTheme.textColor }}
                            >
                                {isLiked ? <FaHeart size={20} /> : <FiHeart size={20} />}
                            </button>

                            {/* Bookmark Button */}
                            <button
                                onClick={handleBookmarkClick}
                                disabled={!isLoggedIn}
                                className={`p-2 md:p-3 rounded-full transition-all duration-200 shadow-md hover:shadow-lg ${
                                    isBookmarked ? "text-white" : "hover:opacity-80"
                                } ${!isLoggedIn ? "opacity-50 cursor-not-allowed" : ""}`}
                                style={isBookmarked ? { backgroundColor: activeTheme.textColor2 } : { backgroundColor: activeTheme.divColor, color: activeTheme.textColor }}
                            >
                                {isBookmarked ? <FaBookmark size={20} /> : <FiBookmark size={20} />}
                            </button>
                        </div>
                    </div>

                    {/* Event Title and Basic Info */}
                    <div className="mb-6">
                        <h1 className="text-2xl md:text-4xl font-bold mb-2" style={{ color: activeTheme.textColor }}>
                            {event.event_name}
                        </h1>
                        <p className="text-lg md:text-xl font-semibold mb-2" style={{ color: activeTheme.textColor2 }}>
                            {event.title}
                        </p>
                        <div className="flex flex-wrap gap-3 md:gap-4">
                            <div className="flex items-center gap-2">
                                <span style={{ color: activeTheme.textColor2 }}>📅</span>
                                <span style={{ color: activeTheme.textColor }}>{event.start_date} • {event.start_time}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span style={{ color: activeTheme.textColor2 }}>📍</span>
                                <span style={{ color: activeTheme.textColor }}>{event.location}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Manager Info Section */}
                <div className="rounded-lg p-4 md:p-6 mb-8" style={{ backgroundColor: activeTheme.divColor }}>
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                        <div>
                            <p className="text-sm" style={{ color: activeTheme.textColor2, opacity: 0.7 }}>Event Manager</p>
                            <h3 className="text-lg md:text-xl font-bold mb-1" style={{ color: activeTheme.textColor }}>
                                {event.manager_name}
                            </h3>
                            <p className="text-sm mb-1 flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity" 
                               style={{ color: activeTheme.textColor2 }}
                               onClick={handleManagerClick}
                            >
                                <span>@{event.manager_username}</span>
                                <span className="text-sm">↗️</span>
                            </p>
                            <p className="text-sm" style={{ color: activeTheme.textColor2 }}>
                                {event.manager_email}
                            </p>
                            <p className="text-sm mt-2" style={{ color: activeTheme.textColor }}>
                                <span className="font-semibold">Company:</span> {event.company_name || 'Not specified'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {/* Likes */}
                    <div 
                        className="rounded-lg p-4 cursor-pointer hover:opacity-80 transition-opacity"
                        style={{ backgroundColor: activeTheme.divColor }}
                        onClick={() => setShowLikesModal(true)}
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <FaHeart style={{ color: activeTheme.textColor2 }} />
                            <span style={{ color: activeTheme.textColor2 }} className="text-sm font-semibold">Likes</span>
                        </div>
                        <p className="text-2xl font-bold" style={{ color: activeTheme.textColor }}>
                            {event.likes_count || 0}
                        </p>
                    </div>

                    {/* Bookmarks */}
                    <div 
                        className="rounded-lg p-4 cursor-pointer hover:opacity-80 transition-opacity"
                        style={{ backgroundColor: activeTheme.divColor }}
                        onClick={() => setShowBookmarkedModal(true)}
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <FaBookmark style={{ color: activeTheme.textColor2 }} />
                            <span style={{ color: activeTheme.textColor2 }} className="text-sm font-semibold">Bookmarks</span>
                        </div>
                        <p className="text-2xl font-bold" style={{ color: activeTheme.textColor }}>
                            {event.bookmark_count || 0}
                        </p>
                    </div>

                    {/* Volunteers */}
                    <div 
                        className="rounded-lg p-4 cursor-pointer hover:opacity-80 transition-opacity"
                        style={{ backgroundColor: activeTheme.divColor }}
                        onClick={() => setShowVolunteersModal(true)}
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <span style={{ color: activeTheme.textColor2 }} className="text-sm font-semibold">👥</span>
                            <span style={{ color: activeTheme.textColor2 }} className="text-sm font-semibold">Volunteers</span>
                        </div>
                        <p className="text-2xl font-bold" style={{ color: activeTheme.textColor }}>
                            {event.volunteer_count || 0}
                        </p>
                    </div>

                    {/* Register Button */}
                    <div className="rounded-lg p-4" style={{ backgroundColor: activeTheme.divColor }}>
                        <button
                            onClick={onRegisterEvent}
                            className={`w-full py-2 rounded-lg font-medium transition-all duration-200 text-white ${!isLoggedIn || type === 'manager' ? "opacity-50 cursor-not-allowed" : ""}`}
                            disabled={!isLoggedIn || type === 'manager'}
                            style={{ backgroundColor: isRegistered ? '#ef4444' : activeTheme.textColor2 }}
                            title={type === 'manager' ? 'Managers cannot register for events' : !isLoggedIn ? 'Please login to register' : ''}
                        >
                            {isRegistered ? 'Deregister' : 'Register'}
                        </button>
                    </div>
                </div>

                {/* Tabs Section */}
                <div className="mb-8">
                    <div className="flex gap-4 border-b" style={{ borderColor: activeTheme.divColor2 }}>
                        <button
                            onClick={() => setActiveTab('details')}
                            className={`px-4 py-3 font-semibold transition-colors duration-200 ${
                                activeTab === 'details'
                                    ? 'text-white border-b-2'
                                    : 'opacity-70 hover:opacity-100'
                            }`}
                            style={{
                                color: activeTab === 'details' ? activeTheme.textColor2 : activeTheme.textColor,
                                borderColor: activeTab === 'details' ? activeTheme.textColor2 : 'transparent'
                            }}
                        >
                            Details
                        </button>
                        <button
                            onClick={() => setActiveTab('images')}
                            className={`px-4 py-3 font-semibold transition-colors duration-200 ${
                                activeTab === 'images'
                                    ? 'text-white border-b-2'
                                    : 'opacity-70 hover:opacity-100'
                            }`}
                            style={{
                                color: activeTab === 'images' ? activeTheme.textColor2 : activeTheme.textColor,
                                borderColor: activeTab === 'images' ? activeTheme.textColor2 : 'transparent'
                            }}
                        >
                            Images
                        </button>
                        <button
                            onClick={() => setActiveTab('videos')}
                            className={`px-4 py-3 font-semibold transition-colors duration-200 ${
                                activeTab === 'videos'
                                    ? 'text-white border-b-2'
                                    : 'opacity-70 hover:opacity-100'
                            }`}
                            style={{
                                color: activeTab === 'videos' ? activeTheme.textColor2 : activeTheme.textColor,
                                borderColor: activeTab === 'videos' ? activeTheme.textColor2 : 'transparent'
                            }}
                        >
                            Videos
                        </button>
                    </div>

                    {/* Tab Content */}
                    <div className="mt-6">
                        {activeTab === 'details' && (
                            <div
                                className="rounded-lg p-6 cursor-pointer hover:opacity-90 transition-opacity"
                                style={{ backgroundColor: activeTheme.divColor }}
                                onClick={() => setShowDetailsModal(true)}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <h3 className="text-lg font-bold mb-3" style={{ color: activeTheme.textColor }}>
                                            Event Information
                                        </h3>
                                        <p className="mb-4 line-clamp-3" style={{ color: activeTheme.textColor2, opacity: 0.8 }}>
                                            {event.description}
                                        </p>

                                        {event.skills && event.skills.length > 0 && (
                                            <div className="mb-4">
                                                <p className="text-sm font-semibold mb-2" style={{ color: activeTheme.textColor2 }}>Skills Required:</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {event.skills.map((skill, index) => (
                                                        <span
                                                            key={index}
                                                            className="px-2 py-1 rounded text-xs font-medium"
                                                            style={{ backgroundColor: activeTheme.divColor2, color: activeTheme.textColor }}
                                                        >
                                                            {skill}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <MdInfo size={24} style={{ color: activeTheme.textColor2 }} />
                                </div>
                            </div>
                        )}

                        {activeTab === 'images' && (
                            <div>
                                {/* Add Image Button */}
                                <div className="flex justify-end mb-4">
                                    <button
                                        onClick={() => setShowImageModal(true)}
                                        className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-white transition-all hover:opacity-90"
                                        style={{ backgroundColor: activeTheme.textColor2 }}
                                    >
                                        <FiPlus size={20} />
                                        Add Images
                                    </button>
                                </div>

                                {/* Images Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {!event.images || event.images.length === 0 ? (
                                        <p style={{ color: activeTheme.textColor2 }}>No images yet</p>
                                    ) : (
                                        event.images.filter(image => image.url).map((image, index) => (
                                            <div 
                                                key={index}
                                                className="relative h-48 rounded-lg overflow-hidden group"
                                                style={{ backgroundColor: activeTheme.divColor }}
                                            >
                                                {image.url && (
                                                    <>
                                                        <Image
                                                            src={image.url}
                                                            alt={`Event image ${index + 1}`}
                                                            fill
                                                            className="object-cover"
                                                            quality={75}
                                                        />
                                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
                                                            <p className="text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                                                                {formatDateTime(image.uploaded_at)}
                                                            </p>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        )}

                        {activeTab === 'videos' && (
                            <div>
                                {/* Add Video Button */}
                                <div className="flex justify-end mb-4">
                                    <button
                                        onClick={() => setShowVideoModal(true)}
                                        className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-white transition-all hover:opacity-90"
                                        style={{ backgroundColor: activeTheme.textColor2 }}
                                    >
                                        <FiPlus size={20} />
                                        Add Videos
                                    </button>
                                </div>

                                {/* Videos Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {!event.videos || event.videos.length === 0 ? (
                                        <p style={{ color: activeTheme.textColor2 }}>No videos yet</p>
                                    ) : (
                                        event.videos.filter(video => video.url).map((video, index) => (
                                            <div 
                                                key={index}
                                                className="relative h-48 rounded-lg overflow-hidden group"
                                                style={{ backgroundColor: activeTheme.divColor }}
                                            >
                                                {video.url && (
                                                    <iframe
                                                        src={video.url}
                                                        title={`Event video ${index + 1}`}
                                                        className="w-full h-full"
                                                        allowFullScreen
                                                    />
                                                )}
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Modals */}
            <div className="fixed inset-0 pointer-events-none z-40">
                <Likes 
                    isOpen={showLikesModal}
                    onClose={() => setShowLikesModal(false)}
                    likes={event.likes}
                    activeTheme={activeTheme}
                />
                <Bookmarked 
                    isOpen={showBookmarkedModal}
                    onClose={() => setShowBookmarkedModal(false)}
                    bookmarked={event.bookmarked}
                    activeTheme={activeTheme}
                />
                <Details 
                    isOpen={showDetailsModal}
                    onClose={() => setShowDetailsModal(false)}
                    event={event}
                    activeTheme={activeTheme}
                />
                <Volunteers 
                    isOpen={showVolunteersModal}
                    onClose={() => setShowVolunteersModal(false)}
                    volunteers={event.volunteers}
                    activeTheme={activeTheme}
                />
                <ImageModal 
                    isOpen={showImageModal}
                    onClose={() => setShowImageModal(false)}
                    eventId={event._id}
                    activeTheme={activeTheme}
                    onImageUploaded={onImageUploaded}
                />
                <VideoModal 
                    isOpen={showVideoModal}
                    onClose={() => setShowVideoModal(false)}
                    eventId={event._id}
                    activeTheme={activeTheme}
                    onVideoUploaded={onVideoUploaded}
                />
            </div>
        </div>
    )
}

export default SpecificEventsView
