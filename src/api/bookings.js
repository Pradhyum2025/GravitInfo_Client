// ---------------------------------------------------------------------
// <copyright file="bookings.js" company="Gravit InfoSystem">
// Copyright (c) Gravit InfoSystem. All rights reserved.
// </copyright>
// ---------------------------------------------------------------------

import axiosInstance from './axiosInstance.js';

export const bookingsAPI = {
  create: async (data) => {
    const response = await axiosInstance.post('/bookings', data);
    return response.data;
  },
  getAll: async (params) => {
    const response = await axiosInstance.get('/bookings', { params });
    return response.data;
  },
  getUserBookings: async (userId) => {
    const response = await axiosInstance.get(`/bookings/user/${userId}`);
    return response.data;
  },
  getById: async (id) => {
    const response = await axiosInstance.get(`/bookings/${id}`);
    return response.data;
  },
  update: async (id, data) => {
    const response = await axiosInstance.put(`/bookings/${id}`, data);
    return response.data;
  },
};


