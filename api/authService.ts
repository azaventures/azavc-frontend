import apiClient from './client';
import { User } from '../types';

interface LoginResponse {
  data: {
    user: User;
    token: string;
  };
}

interface RegisterResponse {
  data: {
    user: User;
    token: string;
  };
}

export const authService = {
  login: async (email: string, password: string) => {
    const response = await apiClient.post<LoginResponse>('/login', {
      email,
      password,
    });
    return response.data;
  },
  
  register: async (email: string, password: string) => {
    const response = await apiClient.post<RegisterResponse>('/register', {
      email,
      password,
    });
    return response.data;
  },
  
  logout: async () => {
    const response = await apiClient.post('/logout');
    return response.data;
  },
  
  getCurrentUser: async () => {
    const response = await apiClient.get('/me');
    return response.data;
  },
};