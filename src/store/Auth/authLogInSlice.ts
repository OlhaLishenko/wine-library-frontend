import { AuthResponse } from '@/features/auth/types/AuthResponse';
import { User } from '@/features/auth/types/User';
import { authService } from '@/services/authService';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

type AuthState = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
};

const AuthState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
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
  reducers: {},
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
      })
      .addCase(logInUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default authLogInSlice.reducer;
