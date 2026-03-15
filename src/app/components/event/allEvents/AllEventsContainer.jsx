"use client"
import React from 'react'
import { useSelector } from 'react-redux'
import { useAllEvents } from './useAllEvents'
import AllEventsView from './AllEventsView'
import colorSchemeOptions from '@/app/state/colorschemeOptions'

const AllEventsContainer = () => {
  const {
    isClient,
    allEvents,
    loading,
    error,
    isLoggedIn,
    username,
    type,
    likedEventIds,
    bookmarkedEventIds,
    fetchAllEvents,
    handleLikeEvent,
    handleUnlikeEvent,
    handleBookmarkEvent,
    handleUnbookmarkEvent
  } = useAllEvents()
  
  const colorId = useSelector((state) => state.colorscheme.id)
  const activeTheme = colorSchemeOptions.find((option) => option.id === colorId) ?? colorSchemeOptions[0]

  if (!isClient) {
    return null
  }

  return (
    <AllEventsView
      events={allEvents}
      loading={loading}
      error={error}
      isLoggedIn={isLoggedIn}
      username={username}
      type={type}
      likedEvents={likedEventIds}
      bookmarkedEvents={bookmarkedEventIds} 
      onLikeEvent={handleLikeEvent}
      onUnlikeEvent={handleUnlikeEvent}
      onBookmarkEvent={handleBookmarkEvent}
      onUnbookmarkEvent={handleUnbookmarkEvent}
      onRefresh={fetchAllEvents}
      activeTheme={activeTheme}
    />
  )
}

export default AllEventsContainer
