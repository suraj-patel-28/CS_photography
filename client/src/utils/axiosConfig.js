import axios from 'axios';
import { toast } from 'react-toastify';

// Set up axios interceptors
const setupAxiosInterceptors = () => {
  // Request interceptor to add token
  axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('adminToken');
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
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        // Token expired or invalid
        localStorage.removeItem('adminToken');
        delete axios.defaults.headers.common['Authorization'];
        
        // Only redirect if on admin routes
        if (window.location.pathname.startsWith('/admin/dashboard')) {
          toast.error('Session expired. Please login again.');
          window.location.href = '/admin';
        }
      }
      
      return Promise.reject(error);
    }
  );
};

export default setupAxiosInterceptors;