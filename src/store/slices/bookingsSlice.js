// ---------------------------------------------------------------------
// <copyright file="bookingsSlice.js" company="Gravit InfoSystem">
// Copyright (c) Gravit InfoSystem. All rights reserved.
// </copyright>
// ---------------------------------------------------------------------

import { createSlice } from '@reduxjs/toolkit';

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState: {
    bookings: [],
    loading: false,
    error: null,
  },
  reducers: {
    setBookings: (state, action) => {
      state.bookings = action.payload;
      state.error = null;
    },
    addBooking: (state, action) => {
      state.bookings.push(action.payload);
      state.error = null;
    },
    updateBookingInState: (state, action) => {
      const index = state.bookings.findIndex(b => b.id === action.payload.id);
      if (index !== -1) {
        state.bookings[index] = action.payload;
      }
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
  setBookings,
  addBooking,
  updateBookingInState,
  setLoading,
  setError,
  clearError,
} = bookingsSlice.actions;
export default bookingsSlice.reducer;


