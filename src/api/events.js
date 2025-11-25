// ---------------------------------------------------------------------
// <copyright file="events.js" company="Gravit InfoSystem">
// Copyright (c) Gravit InfoSystem. All rights reserved.
// </copyright>
// ---------------------------------------------------------------------

import axiosInstance from './axiosInstance.js';

export const eventsAPI = {
  getAll: async (params) => {
    const response = await axiosInstance.get('/events', { params });
    return response.data;
  },
  getById: async (id) => {
    const response = await axiosInstance.get(`/events/${id}`);
    return response.data;
  },
  create: async (data) => {
    const response = await axiosInstance.post('/events', data);
    return response.data;
  },
  update: async (id, data) => {
    const response = await axiosInstance.put(`/events/${id}`, data);
    return response.data;
  },
  delete: async (id) => {
    const response = await axiosInstance.delete(`/events/${id}`);
    return response.data;
  },
};


