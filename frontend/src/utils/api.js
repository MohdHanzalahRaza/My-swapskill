import axios from 'axios'
import toast from 'react-hot-toast'

// Create axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // Handle common errors
    if (error.response) {
      const { status, data } = error.response
      
      switch (status) {
        case 401:
          // Unauthorized - token expired or invalid
          localStorage.removeItem('token')
          delete api.defaults.headers.common['Authorization']
          
          // Don't redirect if we're already on login page
          if (!window.location.pathname.includes('/login')) {
            window.location.href = '/login'
          }
          break
          
        case 403:
          toast.error(data.message || 'Access forbidden')
          break
          
        case 404:
          toast.error(data.message || 'Resource not found')
          break
          
        case 422:
          // Validation errors
          if (data.errors) {
            Object.values(data.errors).forEach(error => {
              toast.error(error)
            })
          } else {
            toast.error(data.message || 'Validation failed')
          }
          break
          
        case 429:
          toast.error('Too many requests. Please try again later.')
          break
          
        case 500:
          toast.error('Server error. Please try again later.')
          break
          
        default:
          toast.error(data.message || 'An error occurred')
      }
    } else if (error.request) {
      // Network error
      toast.error('Network error. Please check your connection.')
    } else {
      // Something else happened
      toast.error('An unexpected error occurred')
    }
    
    return Promise.reject(error)
  }
)

// API endpoints
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout'),
  me: () => api.get('/auth/me'),
  updateDetails: (data) => api.put('/auth/updatedetails', data),
  updatePassword: (data) => api.put('/auth/updatepassword', data),
  forgotPassword: (email) => api.post('/auth/forgotpassword', { email }),
  resetPassword: (token, password) => api.put(`/auth/resetpassword/${token}`, { password }),
  refreshToken: (refreshToken) => api.post('/auth/refresh', { refreshToken }),
  verifyEmail: (token) => api.get(`/auth/verify/${token}`),
  resendVerification: () => api.post('/auth/resend-verification'),
}

export const usersAPI = {
  getAll: (params) => api.get('/users', { params }),
  getById: (id) => api.get(`/users/${id}`),
  update: (id, data) => api.put(`/users/${id}`, data),
  delete: (id) => api.delete(`/users/${id}`),
  search: (query) => api.get('/users/search', { params: { q: query } }),
  uploadAvatar: (file) => {
    const formData = new FormData()
    formData.append('avatar', file)
    return api.post('/users/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },
}

export const skillsAPI = {
  getAll: (params) => api.get('/skills', { params }),
  getById: (id) => api.get(`/skills/${id}`),
  search: (query) => api.get('/skills/search', { params: { q: query } }),
  getCategories: () => api.get('/skills/categories'),
  getUserSkills: (userId) => api.get(`/skills/user/${userId}`),
}

export const swapsAPI = {
  getAll: (params) => api.get('/swaps', { params }),
  getById: (id) => api.get(`/swaps/${id}`),
  create: (data) => api.post('/swaps', data),
  update: (id, data) => api.put(`/swaps/${id}`, data),
  delete: (id) => api.delete(`/swaps/${id}`),
  updateStatus: (id, status) => api.patch(`/swaps/${id}/status`, { status }),
  getUserSwaps: (userId, status) => api.get(`/swaps/user/${userId}`, { 
    params: { status } 
  }),
}

export const messagesAPI = {
  getConversations: () => api.get('/messages/conversations'),
  getMessages: (conversationId, params) => api.get(`/messages/${conversationId}`, { params }),
  send: (data) => api.post('/messages', data),
  markAsRead: (messageId) => api.patch(`/messages/${messageId}/read`),
  delete: (messageId) => api.delete(`/messages/${messageId}`),
}

export const reviewsAPI = {
  getAll: (params) => api.get('/reviews', { params }),
  getById: (id) => api.get(`/reviews/${id}`),
  create: (data) => api.post('/reviews', data),
  update: (id, data) => api.put(`/reviews/${id}`, data),
  delete: (id) => api.delete(`/reviews/${id}`),
  getUserReviews: (userId, params) => api.get(`/reviews/user/${userId}`, { params }),
  voteHelpful: (id, helpful) => api.post(`/reviews/${id}/vote`, { helpful }),
}

// Helper functions
export const handleApiError = (error) => {
  console.error('API Error:', error)
  
  if (error.response?.data?.message) {
    return error.response.data.message
  }
  
  if (error.message) {
    return error.message
  }
  
  return 'An unexpected error occurred'
}

export const isNetworkError = (error) => {
  return !error.response && error.request
}

export const isServerError = (error) => {
  return error.response && error.response.status >= 500
}

export const isClientError = (error) => {
  return error.response && error.response.status >= 400 && error.response.status < 500
}

// File upload helper
export const uploadFile = async (file, endpoint) => {
  const formData = new FormData()
  formData.append('file', file)
  
  return api.post(endpoint, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: (progressEvent) => {
      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      )
      console.log(`Upload Progress: ${percentCompleted}%`)
    },
  })
}

// Retry mechanism for failed requests
export const retryRequest = async (requestFn, maxRetries = 3, delay = 1000) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await requestFn()
    } catch (error) {
      if (i === maxRetries - 1) throw error
      
      // Don't retry for client errors (4xx)
      if (isClientError(error)) throw error
      
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, delay * (i + 1)))
    }
  }
}

export default api