export interface AuthState  {
    accessToken: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    user: {id: number, email: string,  age: number, createdAt: string} | null;
    loading: boolean;
    error: string | null;
    changePasswordStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
    changePasswordError: string | null;
}

export interface RegisterData {
    email: string;
    password: string;
    confirmPassword: string;
    age: number;
  }

export interface ChangePasswordData {
    oldPassword: string;
    newPassword: string;
  }
