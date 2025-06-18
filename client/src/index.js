import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import App from './App';
import setupAxiosInterceptors from './utils/axiosConfig';

// Set up axios interceptors
setupAxiosInterceptors();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);