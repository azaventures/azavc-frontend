import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { getToken, removeToken } from '../utils/authStorage';

const BASE_URL = 'https://api.azaventures.com/v1';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    const token = await getToken();
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const { response } = error;
    
    if (response?.status === 401) {
      // Handle token expiration
      await removeToken();
      // Navigation will be handled by auth state change
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;