// ---------------------------------------------------------------------
// <copyright file="auth.js" company="Gravit InfoSystem">
// Copyright (c) Gravit InfoSystem. All rights reserved.
// </copyright>
// ---------------------------------------------------------------------

import axiosInstance from './axiosInstance.js';

export const authAPI = {
  register: async (data) => {
    const response = await axiosInstance.post('/auth/register', data);
    return response.data;
  },
  login: async (data) => {
    const response = await axiosInstance.post('/auth/login', data);
    return response.data;
  },
};


