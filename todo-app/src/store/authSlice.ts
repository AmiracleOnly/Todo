import { createSlice } from '@reduxjs/toolkit';
import { fetchUser, refreshToken, login, changePassword } from './authAsync';

interface AuthState {
  isAuthenticated: boolean;
  user: { id: number; email: string; age: number; createdAt: string } | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  loading: boolean;
  error: string | null;
  changePasswordStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  changePasswordError: string | null;
}

const initialState: AuthState = {
  isAuthenticated: !!localStorage.getItem('accessToken'),
  user: null,
  status: 'idle',
  loading: false,
  error: null,
  changePasswordStatus: 'idle',
  changePasswordError: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.status = 'idle';
      state.loading = false;
      state.error = null;
      state.changePasswordStatus = 'idle';
      state.changePasswordError = null;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state) => {
        state.status = 'succeeded';
        state.loading = false;
        state.isAuthenticated = true;
        state.changePasswordStatus = 'idle'; // Сбрасываем
        state.changePasswordError = null; // Сбрасываем
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.loading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
        state.user = null;
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      });

    // Fetch User
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading';
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed';
        state.loading = false;
        state.error = action.payload as string;
        console.log('fetchUser rejected:', action.payload);
      });

    // Refresh Token
    builder
      .addCase(refreshToken.pending, (state) => {
        state.status = 'loading';
        state.loading = true;
        state.error = null;
      })
      .addCase(refreshToken.fulfilled, (state) => {
        state.status = 'succeeded';
        state.loading = false;
        state.isAuthenticated = true;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.status = 'failed';
        state.loading = false;
        state.error = action.payload as string;
        console.log('refreshToken rejected:', action.payload);
      });

    // Change Password
    builder
      .addCase(changePassword.pending, (state) => {
        state.changePasswordStatus = 'loading';
        state.loading = true;
        state.changePasswordError = null;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.changePasswordStatus = 'succeeded';
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.changePasswordStatus = 'failed';
        state.loading = false;
        state.changePasswordError = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
