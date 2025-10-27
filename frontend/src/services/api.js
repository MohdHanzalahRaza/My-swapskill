// src/services/api.js - API Service for Frontend-Backend Communication

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Helper function to get auth token
const getAuthToken = () => {
  return localStorage.getItem('swapskillz_token');
};

// Helper function to make API requests
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  // Add auth token if available
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};

// ===================
// AUTHENTICATION API
// ===================

export const authAPI = {
  // Register new user
  register: async (userData) => {
    const response = await apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    
    // Store token in localStorage
    if (response.token) {
      localStorage.setItem('swapskillz_token', response.token);
      localStorage.setItem('swapskillz_user', JSON.stringify(response.user));
    }
    
    return response;
  },

  // Login user
  login: async (credentials) => {
    const response = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    // Store token in localStorage
    if (response.token) {
      localStorage.setItem('swapskillz_token', response.token);
      localStorage.setItem('swapskillz_user', JSON.stringify(response.user));
    }
    
    return response;
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('swapskillz_token');
    localStorage.removeItem('swapskillz_user');
  },

  // Get current user profile
  getCurrentUser: async () => {
    return await apiRequest('/auth/me');
  },

  // Check if user is logged in
  isLoggedIn: () => {
    return !!getAuthToken();
  },

  // Get stored user data
  getStoredUser: () => {
    const userData = localStorage.getItem('swapskillz_user');
    return userData ? JSON.parse(userData) : null;
  }
};

// ===================
// USER PROFILE API
// ===================

export const userAPI = {
  // Update user profile
  updateProfile: async (profileData) => {
    return await apiRequest('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  },

  // Get all users (for skill matching)
  getUsers: async (filters = {}) => {
    const queryParams = new URLSearchParams(filters).toString();
    return await apiRequest(`/users?${queryParams}`);
  },

  // Get user by ID
  getUserById: async (userId) => {
    return await apiRequest(`/users/${userId}`);
  },

  // Search users by skill
  searchUsersBySkill: async (skill, page = 1, limit = 10) => {
    return await apiRequest(`/users?skill=${encodeURIComponent(skill)}&page=${page}&limit=${limit}`);
  }
};

// ===================
// SKILL EXCHANGE API
// ===================

export const exchangeAPI = {
  // Create new skill exchange request
  createExchange: async (exchangeData) => {
    return await apiRequest('/exchanges', {
      method: 'POST',
      body: JSON.stringify(exchangeData),
    });
  },

  // Get user's exchanges
  getUserExchanges: async () => {
    return await apiRequest('/exchanges');
  },

  // Update exchange status
  updateExchangeStatus: async (exchangeId, status) => {
    return await apiRequest(`/exchanges/${exchangeId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  },

  // Get exchange by ID
  getExchangeById: async (exchangeId) => {
    return await apiRequest(`/exchanges/${exchangeId}`);
  }
};

// ===================
// REVIEW API
// ===================

export const reviewAPI = {
  // Create new review
  createReview: async (reviewData) => {
    return await apiRequest('/reviews', {
      method: 'POST',
      body: JSON.stringify(reviewData),
    });
  },

  // Get reviews for a user
  getUserReviews: async (userId) => {
    return await apiRequest(`/users/${userId}/reviews`);
  }
};

// ===================
// GENERAL API
// ===================

export const generalAPI = {
  // Get platform statistics
  getStats: async () => {
    return await apiRequest('/stats');
  },

  // Health check
  healthCheck: async () => {
    return await apiRequest('/health');
  },

  // Newsletter subscription
  subscribeNewsletter: async (email) => {
    return await apiRequest('/newsletter/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }
};

// ===================
// ERROR HANDLING
// ===================

export class APIError extends Error {
  constructor(message, status, data) {
    super(message);
    this.status = status;
    this.data = data;
    this.name = 'APIError';
  }
}

// ===================
// INTERCEPTORS
// ===================

// Request interceptor to add auth token
export const setupAuthInterceptor = () => {
  // This would be used with axios interceptors if we were using axios
  // For now, we handle auth in the apiRequest function
};

// Response interceptor to handle common errors
export const handleApiError = (error) => {
  if (error.message === 'Invalid token.' || error.message === 'Access denied. No token provided.') {
    // Token expired or invalid, logout user
    authAPI.logout();
    window.location.href = '/login';
  }
  
  return Promise.reject(error);
};

// ===================
// UTILITY FUNCTIONS
// ===================

export const formatApiError = (error) => {
  if (error.message) {
    return error.message;
  }
  
  return 'An unexpected error occurred. Please try again.';
};

export const isApiError = (error) => {
  return error instanceof APIError;
};

// Export default object with all APIs
const api = {
  auth: authAPI,
  user: userAPI,
  exchange: exchangeAPI,
  review: reviewAPI,
  general: generalAPI
};

export default api;