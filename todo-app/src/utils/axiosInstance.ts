import axios, { AxiosError, type AxiosInstance } from 'axios';
import { logout } from '../store/authSlice';
import { refreshToken as refreshTokenThunk } from '../store/authAsync';

const API_URL = 'http://localhost:3001';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: any) => void;
  reject: (reason?: any) => void;
}> = [];

const processQueue = (error: AxiosError | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

export const setupAxiosInterceptors = (store: any) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config;

      if (
        error.response?.status === 401 &&
        originalRequest &&
        originalRequest.url !== '/auth/refresh'
      ) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              if (token && originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${token}`;
                return axiosInstance(originalRequest);
              }
              return Promise.reject(error);
            })
            .catch((err) => Promise.reject(err));
        }

        isRefreshing = true;

        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
          console.log('No refresh token found, logging out.');
          store.dispatch(logout());
          isRefreshing = false;
          processQueue(error);
          return Promise.reject(error);
        }

        try {
          const resultAction = await store.dispatch(refreshTokenThunk());
          if (refreshTokenThunk.fulfilled.match(resultAction)) {
            const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
              resultAction.payload;
            localStorage.setItem('accessToken', newAccessToken);
            localStorage.setItem('refreshToken', newRefreshToken);
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            }
            isRefreshing = false;
            processQueue(null, newAccessToken);
            return axiosInstance(originalRequest);
          } else {
            console.log('Refresh token failed, logging out.');
            isRefreshing = false;
            processQueue(error);
            store.dispatch(logout());
            return Promise.reject(error);
          }
        } catch (refreshError) {
          console.error('Error during refresh token attempt:', refreshError);
          isRefreshing = false;
          processQueue(error);
          store.dispatch(logout());
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    }
  );
};

export default axiosInstance;
