import axios from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_URL

const axiosInstance = axios.create({
  baseURL: backendUrl,
});

// Attach token using request interceptor


export default axiosInstance;
