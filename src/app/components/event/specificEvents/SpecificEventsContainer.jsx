"use client"

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import colorSchemeOptions from "@/app/state/colorschemeOptions"
import { useSpecificEvents } from './usespecificEvents'
import SpecificEventsView from './SpecificEventsView'
import LoadingSpinner from '@/app/components/LoadingSpinner'

const SpecificEventsContainer = () => {
  const router = useRouter()
  const { isLoggedIn } = useSelector((state) => state.userdata)
  const colorId = useSelector((state) => state.colorscheme.id)
  
  const {
    isClient,
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
  } = useSpecificEvents()

  const activeTheme = colorSchemeOptions.find((option) => option.id === colorId) ?? colorSchemeOptions[0]

  // Redirect to login if not logged in
  useEffect(() => {
    if (isClient && !isLoggedIn) {
      router.push('/login')
    }
  }, [isClient, isLoggedIn, router])

  if (!isClient) {
    return null
  }

  if (!isLoggedIn) {
    return null
  }

  return (
    <>
      {loading && <LoadingSpinner />}
      <SpecificEventsView
        event={event}
        loading={loading}
        error={error}
        isLoggedIn={isLoggedIn}
        username={username}
        type={type}
        isLiked={isLiked}
        isBookmarked={isBookmarked}
        isRegistered={isRegistered}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        showLikesModal={showLikesModal}
        setShowLikesModal={setShowLikesModal}
        showBookmarkedModal={showBookmarkedModal}
        setShowBookmarkedModal={setShowBookmarkedModal}
        showDetailsModal={showDetailsModal}
        setShowDetailsModal={setShowDetailsModal}
        showVolunteersModal={showVolunteersModal}
        setShowVolunteersModal={setShowVolunteersModal}
        showImageModal={showImageModal}
        setShowImageModal={setShowImageModal}
        showVideoModal={showVideoModal}
        setShowVideoModal={setShowVideoModal}
        onLikeEvent={isLiked ? handleUnlikeEvent : handleLikeEvent}
        onBookmarkEvent={isBookmarked ? handleUnbookmarkEvent : handleBookmarkEvent}
        onRegisterEvent={isRegistered ? handleDeregisterEvent : handleRegisterEvent}
        activeTheme={activeTheme}
        onImageUploaded={handleImageUploaded}
        onVideoUploaded={handleVideoUploaded}
      />
    </>
  )
}

export default SpecificEventsContainer
