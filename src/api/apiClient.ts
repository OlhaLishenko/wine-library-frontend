import { API_CONFIG } from '@/config/api';
import { store } from '@/store';
import axios from 'axios';
import { AuthResponse } from '@/features/auth/types/AuthResponse';
import { authClient } from './authClient';
import { logOut, tokensUpdated } from '@/store/Auth/authLogInSlice';
import qs from 'qs';

export const apiClient = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
});

apiClient.interceptors.request.use((config) => {
  const token = store.getState().authLogIn.accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let isRefreshing = false;
let queue: Array<{
  resolve: (token: string) => void;
  reject: (err: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  queue.forEach((p) => (error ? p.reject(error) : p.resolve(token!)));
  queue = [];
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          queue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return apiClient(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { refreshToken } = store.getState().authLogIn;
        if (!refreshToken) throw new Error('No refresh token');

        const { data } = await authClient.post<AuthResponse>('/refresh', {
          refreshToken,
        });

        store.dispatch(tokensUpdated(data));
        processQueue(null, data.accessToken);

        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        store.dispatch(logOut());
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
