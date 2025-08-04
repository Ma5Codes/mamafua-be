import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('authToken');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },
  
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
  
  getUserInfo: async () => {
    const response = await api.get('/auth/info');
    return response.data;
  }
};

// Transaction API calls
export const transactionAPI = {
  getAll: async (params = {}) => {
    const response = await api.get('/transactions/transaction', { params });
    return response.data;
  },
  
  getById: async (id) => {
    const response = await api.get(`/transactions/transaction/${id}`);
    return response.data;
  },
  
  create: async (transactionData) => {
    const response = await api.post('/transactions/transaction', transactionData);
    return response.data;
  },
  
  update: async (id, transactionData) => {
    const response = await api.put(`/transactions/transaction/${id}`, transactionData);
    return response.data;
  },
  
  delete: async (id) => {
    const response = await api.delete(`/transactions/transaction/${id}`);
    return response.data;
  },
  
  markAsPaid: async (id, cashier) => {
    const response = await api.put(`/transactions/transaction/pay/${id}`, { cashier });
    return response.data;
  },
  
  takeOut: async (id) => {
    const response = await api.put(`/transactions/transaction/take/${id}`);
    return response.data;
  },
  
  getTodayInfo: async () => {
    const response = await api.get('/transactions/transaction/info/today');
    return response.data;
  },
  
  getRecapByDate: async (date) => {
    const response = await api.get('/transactions/transaction/recap/date', { 
      params: { date } 
    });
    return response.data;
  }
};

// Customer API calls
export const customerAPI = {
  getAll: async (params = {}) => {
    const response = await api.get('/customers/customer', { params });
    return response.data;
  },
  
  getById: async (id) => {
    const response = await api.get(`/customers/customer/${id}`);
    return response.data;
  },
  
  create: async (customerData) => {
    const response = await api.post('/customers/customer', customerData);
    return response.data;
  },
  
  update: async (id, customerData) => {
    const response = await api.put(`/customers/customer/${id}`, customerData);
    return response.data;
  },
  
  delete: async (id) => {
    const response = await api.delete(`/customers/customer/${id}`);
    return response.data;
  }
};

// Activity API calls
export const activityAPI = {
  getAll: async (params = {}) => {
    const response = await api.get('/activities/activities', { params });
    return response.data;
  }
};

export default api;
