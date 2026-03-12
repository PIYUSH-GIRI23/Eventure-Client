"use client"
import React from 'react'
import { useSelector } from 'react-redux'
import { useAllEvents } from './useAllEvents'
import AllEventsView from './AllEventsView'
import colorSchemeOptions from '@/app/state/colorschemeOptions'

const AllEventsContainer = () => {
  const {
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
  } = useAllEvents()

  const colorId = useSelector((state) => state.colorscheme.id)
  const activeTheme = colorSchemeOptions.find((option) => option.id === colorId) ?? colorSchemeOptions[0]

  if (!isClient) {
    return null
  }

  // TEMP: Duplicate events 5x for testing
  const duplicatedEvents = events.flatMap((event, index) => 
    Array(5).fill().map((_, i) => ({
      ...event,
      _id: `${event._id}-${i}`
    }))
  )

  return (
    <AllEventsView
      events={events}
      loading={loading}
      error={error}
      isLoggedIn={isLoggedIn}
      username={username}
      likedEvents={likedEvents}
      bookmarkedEvents={bookmarkedEvents}
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
