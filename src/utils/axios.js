import axios from "axios";

const root = document.getElementById("voomsway-search-root");
const apiUrl = root.dataset.apiurl;
const api_key = root.dataset.apikey;

// Default config options
const defaultOptions = {
  baseURL: apiUrl || process.env.REACT_APP_HOST,
  headers: {}
};

// Create instance
const axiosInstance = axios.create(defaultOptions);

axiosInstance.interceptors.request.use(
  config => {
    config.headers["x-client-key"] = api_key || process.env.REACT_APP_CLIENT_KEY;
    config.headers["x-access-token"] = process.env.REACT_APP_API_TOKEN;
    config.headers["x-api-key"] = "Voomsway";
    return config;
  },
  error => {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default axiosInstance;
