"use client"
import React from 'react'
import { useSelector } from 'react-redux'
import { useCreatedEvents } from './useCreatedEvents'
import AllEventsView from './AllEventsView'
import colorSchemeOptions from '@/app/state/colorschemeOptions'
import LoadingSpinner from '@/app/components/LoadingSpinner'

const CreatedEventsContainer = () => {
  const {
    isClient,
    events,
    loading,
    error,
    isLoggedIn,
    fetchCreatedEvents,
    handleLikeEvent,
    handleUnlikeEvent,
    handleBookmarkEvent,
    handleUnbookmarkEvent
  } = useCreatedEvents()

  const colorId = useSelector((state) => state.colorscheme.id)
  const activeTheme = colorSchemeOptions.find((option) => option.id === colorId) ?? colorSchemeOptions[0]

  if (!isClient) {
    return null
  }

  if (loading) {
    return <LoadingSpinner />
  }

  // Create sets for liked and bookmarked IDs from current events
  const likedEventIds = new Set(events.filter(e => e.likes && e.likes.length > 0).map(e => e._id))
  const bookmarkedEventIds = new Set(events.filter(e => e.bookmarked && e.bookmarked.length > 0).map(e => e._id))

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
      onRefresh={fetchCreatedEvents}
      activeTheme={activeTheme}
    />
  )
}

export default CreatedEventsContainer
