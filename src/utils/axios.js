import axios from "axios";

// Default config options
const defaultOptions = {
  baseURL: "https://voomsway.herokuapp.com/api/v1",
  headers: {}
};

// Create instance
const axiosInstance = axios.create(defaultOptions);

axiosInstance.interceptors.request.use(
  config => {
    config.headers["x-api-key"] = process.env.REACT_APP_API_KEY;
    return config;
  },
  error => {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default axiosInstance;
