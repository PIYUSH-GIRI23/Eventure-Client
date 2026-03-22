"use client"
import React from 'react'
import { useSelector } from 'react-redux'
import { useBookmarkedEvents } from './useBookmarkedEvents'
import AllEventsView from './AllEventsView'
import colorSchemeOptions from '@/app/state/colorschemeOptions'
import LoadingSpinner from '@/app/components/LoadingSpinner'

const BookmarkedEventsContainer = () => {
  const {
    isClient,
    events,
    loading,
    error,
    isLoggedIn,
    fetchBookmarkedEvents,
    handleLikeEvent,
    handleUnlikeEvent,
    handleBookmarkEvent,
    handleUnbookmarkEvent
  } = useBookmarkedEvents()

  const colorId = useSelector((state) => state.colorscheme.id)
  const { username } = useSelector((state) => state.userdata)
  const activeTheme = colorSchemeOptions.find((option) => option.id === colorId) ?? colorSchemeOptions[0]

  if (!isClient) {
    return null
  }

  if (loading) {
    return <LoadingSpinner />
  }

  // Create sets for liked and bookmarked IDs from current events
  const likedEventIds = new Set(events.filter(e => e.likes && e.likes.some(l => l.username === username)).map(e => e._id))
  const bookmarkedEventIds = new Set(events.map(e => e._id))

  return (
    <AllEventsView
      events={events}
      loading={loading}
      error={error}
      isLoggedIn={isLoggedIn}
      likedEvents={likedEventIds}
      bookmarkedEvents={bookmarkedEventIds}
      onLikeEvent={handleLikeEvent}
      onUnlikeEvent={handleUnlikeEvent}
      onBookmarkEvent={handleBookmarkEvent}
      onUnbookmarkEvent={handleUnbookmarkEvent}
      onRefresh={fetchBookmarkedEvents}
      activeTheme={activeTheme}
    />
  )
}

export default BookmarkedEventsContainer
