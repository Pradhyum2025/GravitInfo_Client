// ---------------------------------------------------------------------
// <copyright file="eventsSlice.js" company="Gravit InfoSystem">
// Copyright (c) Gravit InfoSystem. All rights reserved.
// </copyright>
// ---------------------------------------------------------------------

import { createSlice } from '@reduxjs/toolkit';

const eventsSlice = createSlice({
  name: 'events',
  initialState: {
    events: [],
    selectedEvent: null,
    filters: {
      location: '',
      date: '',
      status: '',
    },
    loading: false,
    error: null,
  },
  reducers: {
    setEvents: (state, action) => {
      state.events = action.payload;
      state.error = null;
    },
    setSelectedEvent: (state, action) => {
      state.selectedEvent = action.payload;
      state.error = null;
    },
    addEvent: (state, action) => {
      state.events.push(action.payload);
    },
    updateEventInState: (state, action) => {
      const index = state.events.findIndex(e => e.id === action.payload.id);
      if (index !== -1) {
        state.events[index] = action.payload;
      }
      if (state.selectedEvent?.id === action.payload.id) {
        state.selectedEvent = action.payload;
      }
    },
    removeEvent: (state, action) => {
      state.events = state.events.filter(e => e.id !== action.payload);
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearSelectedEvent: (state) => {
      state.selectedEvent = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setEvents,
  setSelectedEvent,
  addEvent,
  updateEventInState,
  removeEvent,
  setFilters,
  clearSelectedEvent,
  setLoading,
  setError,
  clearError,
} = eventsSlice.actions;
export default eventsSlice.reducer;


