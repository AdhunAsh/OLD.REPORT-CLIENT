import axios from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_URL

let setLoading = null;

export const setLoadingHandler = (fn) => {
  setLoading = fn;
};

const axiosInstance = axios.create({
  baseURL: backendUrl,
});


let activeRequests = 0;

axiosInstance.interceptors.request.use(
  (config) => {
    activeRequests++;
    setLoading(true);
    return config;
  },
  (error) => {
    activeRequests--;
    if (activeRequests === 0) setLoading(false);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    activeRequests--;
    if (activeRequests === 0) setLoading(false);
    return response;
  },
  (error) => {
    activeRequests--;
    if (activeRequests === 0) setLoading(false);
    return Promise.reject(error);
  }
);


// Attach token using request interceptor


export default axiosInstance;
