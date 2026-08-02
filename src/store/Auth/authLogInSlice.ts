import { AuthResponse } from '@/features/auth/types/AuthResponse';
import { User } from '@/features/auth/types/User';
import { authService } from '@/services/auth.service';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

type AuthState = {
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
};

const storedToken = localStorage.getItem('token');

const AuthState: AuthState = {
  token: storedToken,
  isAuthenticated: !!storedToken,
  loading: false,
  error: null,
};

export const logInUser = createAsyncThunk(
  'auth/logInUser',
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const authUser: AuthResponse = await authService.login(
        credentials.email,
        credentials.password
      );
      return { token: authUser.token };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to login';
      return rejectWithValue(message);
    }
  }
);

export const authLogInSlice = createSlice({
  name: 'authLogIn',
  initialState: AuthState,
  reducers: {
    logOut: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logInUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logInUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(logInUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
export const { logOut } = authLogInSlice.actions;
export default authLogInSlice.reducer;
