
// import { createAsyncThunk } from '@reduxjs/toolkit';
// import axiosInstance from '../utils/axiosInstance';
// import { AxiosError } from 'axios';

// interface RegisterData {
//   email: string;
//   password: string;
//   age?: number;
// }

// interface LoginData {
//   email: string;
//   password: string;
// }

// interface ChangePasswordData {
//   oldPassword: string;
//   newPassword: string;
// }

// interface ErrorResponse {
//   error: string;
// }

// export const registerUser = createAsyncThunk(
//   'auth/registerUser',
//   async (data: RegisterData, { dispatch, rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.post('/auth/register', data);
//       localStorage.setItem('accessToken', response.data.accessToken);
//       localStorage.setItem('refreshToken', response.data.refreshToken);
//       await dispatch(fetchUser()).unwrap();
//       return response.data;
//     } catch (error) {
//       const axiosError = error as AxiosError<ErrorResponse>;
//       return rejectWithValue(axiosError.response?.data?.error || 'Ошибка регистрации');
//     }
//   }
// );

// export const login = createAsyncThunk(
//   'auth/login',
//   async (data: LoginData, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.post('/auth/login', data);
//       localStorage.setItem('accessToken', response.data.accessToken);
//       localStorage.setItem('refreshToken', response.data.refreshToken);
//       return response.data;
//     } catch (error) {
//       const axiosError = error as AxiosError<ErrorResponse>;
//       return rejectWithValue(axiosError.response?.data?.error || 'Ошибка входа');
//     }
//   }
// );

// export const fetchUser = createAsyncThunk(
//   'auth/fetchUser',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.get('/auth/me');
//       return response.data;
//     } catch (error) {
//       const axiosError = error as AxiosError<ErrorResponse>;
//       return rejectWithValue(axiosError.response?.data?.error || 'Ошибка получения профиля');
//     }
//   }
// );

// export const refreshToken = createAsyncThunk(
//   'auth/refreshToken',
//   async (_, { rejectWithValue }) => {
//     try {
//       const refreshToken = localStorage.getItem('refreshToken');
//       if (!refreshToken) throw new Error('No refresh token');
//       const response = await axiosInstance.post('/auth/refresh', { refreshToken });
//       localStorage.setItem('accessToken', response.data.accessToken);
//       localStorage.setItem('refreshToken', response.data.refreshToken);
//       return response.data;
//     } catch (error) {
//       const axiosError = error as AxiosError<ErrorResponse>;
//       return rejectWithValue(axiosError.response?.data?.error || 'Ошибка обновления токена');
//     }
//   }
// );

// export const changePassword = createAsyncThunk(
//   'auth/changePassword',
//   async (data: ChangePasswordData, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.post('/auth/change-password', data);
//       return response.data;
//     } catch (error) {
//       const axiosError = error as AxiosError<ErrorResponse>;
//       return rejectWithValue(axiosError.response?.data?.error || 'Ошибка смены пароля');
//     }
//   }
// );
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../utils/axiosInstance';
import { AxiosError } from 'axios';
import {type RegisterData } from '../types/authData';

interface LoginData {
  email: string;
  password: string;
}

interface ChangePasswordData {
  oldPassword: string;
  newPassword: string;
}

interface ErrorResponse {
  error: string;
}

// export const registerUser = createAsyncThunk(
//   'auth/registerUser',
//   async (data: RegisterData, { dispatch, rejectWithValue }) => {
//     try {
//       const { email, password, age } = data;
//       const response = await axiosInstance.post('/auth/register', { email, password, age });
//       localStorage.setItem('accessToken', response.data.accessToken);
//       localStorage.setItem('refreshToken', response.data.refreshToken);
//       console.log('Register: Tokens saved to localStorage');
//       await dispatch(fetchUser()).unwrap();
//       return response.data;
//     } catch (error) {
//       const axiosError = error as AxiosError<ErrorResponse>;
//       console.error('Register error:', axiosError.response?.data);
//       return rejectWithValue(axiosError.response?.data?.error || 'Ошибка регистрации');
//     }
//   }
// );

// export const login = createAsyncThunk(
//   'auth/login',
//   async (data: LoginData, { dispatch, rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.post('/auth/login', data);
//       localStorage.setItem('accessToken', response.data.accessToken);
//       localStorage.setItem('refreshToken', response.data.refreshToken);
//       console.log('Login: Tokens saved to localStorage');
//       await dispatch(fetchUser()).unwrap();
//       return response.data;
//     } catch (error) {
//       const axiosError = error as AxiosError<ErrorResponse>;
//       console.error('Login error:', axiosError.response?.data);
//       return rejectWithValue(axiosError.response?.data?.error || 'Ошибка входа');
//     }
//   }
// );

export const login = createAsyncThunk(
  'auth/login',
  async (data: LoginData, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/auth/login', data);
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      console.log('Login: Tokens saved to localStorage');
      await dispatch(fetchUser()).unwrap();
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      console.error('Login error:', axiosError.response?.data);
      return rejectWithValue(axiosError.response?.data?.error || 'Ошибка входа');
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (data: RegisterData, { dispatch, rejectWithValue }) => {
    try {
      const { email, password, age } = data;
      const response = await axiosInstance.post('/auth/register', { email, password, age });
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      console.log('Register: Tokens saved to localStorage');
      await dispatch(fetchUser()).unwrap();
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      console.error('Register error:', axiosError.response?.data);
      return rejectWithValue(axiosError.response?.data?.error || 'Ошибка регистрации');
    }
  }
);

export const fetchUser = createAsyncThunk(
  'auth/fetchUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/auth/me');
      console.log('FetchUser: User data received', response.data);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      console.error('FetchUser error:', axiosError.response?.data);
      return rejectWithValue(axiosError.response?.data?.error || 'Ошибка получения профиля');
    }
  }
);

export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, { rejectWithValue }) => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) throw new Error('No refresh token');
      const response = await axiosInstance.post('/auth/refresh', { refreshToken });
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      console.log('RefreshToken: New tokens saved');
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      console.error('RefreshToken error:', axiosError.response?.data);
      return rejectWithValue(axiosError.response?.data?.error || 'Ошибка обновления токена');
    }
  }
);

export const changePassword = createAsyncThunk(
  'auth/changePassword',
  async (data: ChangePasswordData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/auth/change-password', data);
      console.log('ChangePassword: Success');
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      console.error('ChangePassword error:', axiosError.response?.data);
      return rejectWithValue(axiosError.response?.data?.error || 'Ошибка смены пароля');
    }
  }
);
// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { AxiosError } from "axios";
// import { type AuthState } from '../types/authData';
// import { type ErrorResponse } from "../types/ErrorType";
// import {type ChangePasswordData} from '../types/authData'
// import axiosInstance from '../utils/axiosInstance';
// // import { setTokens } from "./authSlice";
// import { type RegisterData } from "../types/authData";



// export const fetchUser = createAsyncThunk(
//   'auth/fetchUser',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.get(`/auth/me`);
//       console.log('User fetched successful:', response.data);
//       return response.data;
//     } catch (error) {
//       const axiosError = error as AxiosError<ErrorResponse>
//       const errorMessage = axiosError.response?.data?.error || 'Failed to fetch user';
//       console.error('Fetch user error:', {
//         message: errorMessage,
//         status: axiosError.response?.status,
//       });
//       return rejectWithValue(errorMessage);
//     }
//   }
// );


// // Обновление токенов
// export const refreshToken = createAsyncThunk(
//   'auth/refreshToken',
//   async (_, { rejectWithValue, getState }) => {
//     try {
//       const state = getState() as { auth: AuthState };
//       const refreshToken = state.auth.refreshToken;
//       if (!refreshToken) {
//         return rejectWithValue('No refresh token available. Please log in.');
//       }
//       const response = await axiosInstance.post(`/auth/refresh`, { refreshToken });
//       return response.data;
//     } catch (error) {
//       const axiosError = error as AxiosError<ErrorResponse>;
//       const errorMessage = axiosError.response?.data?.error || 'Failed to refresh token';
//       console.error('Refresh token error:', {
//         message: errorMessage,
//         status: axiosError.response?.status,
//       });
//       return rejectWithValue(errorMessage);
//     }
//   }
// );

// export const RegisterUser = createAsyncThunk(
//   'auth/register',
//   async (data: RegisterData, { dispatch, rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.post(`/auth/register`, data);
//       const { accessToken, refreshToken } = response.data;

//       // Сохраняем токены в Redux
//       // dispatch(setTokens({ accessToken, refreshToken }));
//       console.log('Tokens dispatched to Redux:', { accessToken, refreshToken });

//       // Получаем данные пользователя после успешной регистрации и сохранения токенов
//       // Используем .unwrap() для обработки возможных ошибок при получении пользователя
//       await dispatch(fetchUser()).unwrap();
//       return response.data;
//     } catch (error) {
//       const axiosError = error as AxiosError<ErrorResponse>;
//       const errorMessage = axiosError.response?.data?.error || 'Ошибка регистрации';
//       console.error('Registration error:', {
//         message: errorMessage,
//         status: axiosError.response?.status,
//         data: axiosError.response?.data,
//       });
//       return rejectWithValue(errorMessage);
//     }
//   }
// );


// export const login = createAsyncThunk(
//   'auth/login',
//   async ({ email, password }: { email: string, password: string }, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.post(`/auth/login`, { email, password });
//       return response.data;
//     } catch (error) {
//       const axiosError = error as AxiosError<ErrorResponse>;
//       const errorMessage = axiosError.response?.data?.error || 'failed to login';
//       console.error('Login error:', {
//         message: errorMessage,
//         status: axiosError.response?.status,
//       });
//       return rejectWithValue(errorMessage);
//     }
//   }
// );

// export const changePassword = createAsyncThunk(
//   'auth/changePassword',
//   async (data: ChangePasswordData, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.post('/auth/change-password', data);
//       return response.data;
//     } catch (error) {
//       const axiosError = error as AxiosError<ErrorResponse>;
//       return rejectWithValue(axiosError.response?.data?.error || 'Ошибка смены пароля');
//     }
//   }
// );
