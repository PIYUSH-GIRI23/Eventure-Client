import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allEvents: [],
  likedEventIds: [], 
  bookmarkedEventIds: [],
  registeredEventIds: [], 
  loading: false,
  error: null,
  lastFetchTime: null,
};

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setEventsLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setEventsSuccess: (state, action) => {
      const { events, likedEventIds, bookmarkedEventIds, registeredEventIds } =
        action.payload;
      state.allEvents = events;
      state.likedEventIds = likedEventIds;
      state.bookmarkedEventIds = bookmarkedEventIds;
      state.registeredEventIds = registeredEventIds;
      state.loading = false;
      state.error = null;
      state.lastFetchTime = Date.now();
    },
    setEventsError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateEventLiked: (state, action) => {
      const { eventId, isLiked } = action.payload;
      if (isLiked) {
        if (!state.likedEventIds.includes(eventId)) {
          state.likedEventIds.push(eventId);
        }
      } else {
        state.likedEventIds = state.likedEventIds.filter(id => id !== eventId);
      }
    },
    updateEventBookmarked: (state, action) => {
      const { eventId, isBookmarked } = action.payload;
      if (isBookmarked) {
        if (!state.bookmarkedEventIds.includes(eventId)) {
          state.bookmarkedEventIds.push(eventId);
        }
      } else {
        state.bookmarkedEventIds = state.bookmarkedEventIds.filter(id => id !== eventId);
      }
    },
    updateEventRegistered: (state, action) => {
      const { eventId, isRegistered } = action.payload;
      if (isRegistered) {
        if (!state.registeredEventIds.includes(eventId)) {
          state.registeredEventIds.push(eventId);
        }
      } else {
        state.registeredEventIds = state.registeredEventIds.filter(id => id !== eventId);
      }
    },
    updateEventLikeCount: (state, action) => {
      const { eventId, count } = action.payload;
      const eventIndex = state.allEvents.findIndex((e) => e._id === eventId);
      if (eventIndex !== -1) {
        state.allEvents[eventIndex] = {
          ...state.allEvents[eventIndex],
          likes_count: count
        };
      }
    },
    updateEventBookmarkCount: (state, action) => {
      const { eventId, count } = action.payload;
      const eventIndex = state.allEvents.findIndex((e) => e._id === eventId);
      if (eventIndex !== -1) {
        state.allEvents[eventIndex] = {
          ...state.allEvents[eventIndex],
          bookmark_count: count
        };
      }
    },
    clearEvents: (state) => {
      state.allEvents = [];
      state.likedEventIds = [];
      state.bookmarkedEventIds = [];
      state.registeredEventIds = [];
      state.lastFetchTime = null;
    },
    forceRefresh: (state) => {
      state.lastFetchTime = null;
    },
  },
});

export const {
  setEventsLoading,
  setEventsSuccess,
  setEventsError,
  updateEventLiked,
  updateEventBookmarked,
  updateEventRegistered,
  updateEventLikeCount,
  updateEventBookmarkCount,
  clearEvents,
  forceRefresh,
} = eventsSlice.actions;

export default eventsSlice.reducer;
