import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/';
    }
    
    // Enhanced error handling
    if (error.code === 'ECONNABORTED') {
      error.response = {
        data: { message: 'Request timeout. Please try again.' }
      };
    } else if (!error.response) {
      error.response = {
        data: { message: 'Network error. Please check your connection.' }
      };
    }
    
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      console.error('Registration API error:', error);
      throw error;
    }
  },
  
  getMe: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
};

// Users API
export const usersAPI = {
  getDashboard: async () => {
    const response = await api.get('/users/dashboard');
    return response.data;
  },
  
  updateProfile: async (profileData) => {
    const response = await api.put('/users/profile', profileData);
    return response.data;
  },
};

// Opportunities API
export const opportunitiesAPI = {
  getAll: async () => {
    const response = await api.get('/opportunities');
    return response.data;
  },
  
  create: async (opportunityData) => {
    const response = await api.post('/opportunities', opportunityData);
    return response.data;
  },
};

export default api;