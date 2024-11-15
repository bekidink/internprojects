// axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://dummyjson.com", // replace with your API base URL
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// You can also add interceptors if needed
axiosInstance.interceptors.request.use(
  (config) => {
    // Modify config if necessary (e.g., adding authentication token)
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default axiosInstance;
