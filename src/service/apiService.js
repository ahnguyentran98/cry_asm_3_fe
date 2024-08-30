// src/service/apiService.js

import axios from 'axios';

// Create an Axios instance
const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api', // Replace with your backend base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the JWT token in headers
apiClient.interceptors.request.use(
  (config) => {
    // Get the JWT token from local storage
    const token = localStorage.getItem('jwt');

    if (token) {
      // If token exists, add it to the headers
      config.headers['x-auth-token'] = token;
    }

    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

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

  // PATCH request
  patch(url, data) {
    return apiClient.patch(url, data);
  },
};
