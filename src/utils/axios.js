import axios from 'axios';

const root = document.getElementById('voomsway-search-root');
const apiUrl = root.dataset.apiurl;
const apikey = root.dataset.apikey;
const apiclientkey = root.dataset.apiclientkey;

// Default config options
const defaultOptions = {
  baseURL: apiUrl || process.env.REACT_APP_API_URL,
  headers: {},
};

// Create instance
const axiosInstance = axios.create(defaultOptions);

axiosInstance.interceptors.request.use(
  config => {
    config.headers['x-client-key'] =
      apiclientkey || process.env.REACT_APP_API_CLIENT_KEY;
    config.headers['x-api-key'] = apikey || process.env.REACT_APP_API_KEY;
    return config;
  },
  error => {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default axiosInstance;
