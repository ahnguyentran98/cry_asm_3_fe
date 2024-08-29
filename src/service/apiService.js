// src/services/apiService.js

import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default {
  // GET request
  get(url, params = {}) {
    return apiClient.get(url, { params });
  },

  // POST request
  post(url, data) {
    return apiClient.post(url, data);
  },

  // PUT request
  put(url, data) {
    return apiClient.put(url, data);
  },

  // DELETE request
  delete(url) {
    return apiClient.delete(url);
  },

  // PATCH request (if needed)
  patch(url, data) {
    return apiClient.patch(url, data);
  },
};
