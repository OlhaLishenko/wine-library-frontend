import { AuthResponse } from '@/features/auth/types/AuthResponse';
import { authService } from '@/services/auth.service';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
};

const storedAccessToken = localStorage.getItem('accessToken');
const storedRefreshToken = localStorage.getItem('refreshToken');

const initialState: AuthState = {
  accessToken: storedAccessToken,
  refreshToken: storedRefreshToken,
  isAuthenticated: !!storedAccessToken,
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
      return {
        accessToken: authUser.accessToken,
        refreshToken: authUser.refreshToken,
      };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to login';
      return rejectWithValue(message);
    }
  }
);

export const logOutUser = createAsyncThunk(
  'auth/logOutUser',
  async (refreshToken: string, { rejectWithValue }) => {
    try {
      await authService.logout(refreshToken);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to logout';
      return rejectWithValue(message);
    }
  }
);

export const authLogInSlice = createSlice({
  name: 'authLogIn',
  initialState,
  reducers: {
    logOut: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },
    tokensUpdated: (state, action: PayloadAction<AuthResponse>) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
      localStorage.setItem('accessToken', action.payload.accessToken);
      localStorage.setItem('refreshToken', action.payload.refreshToken);
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
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        localStorage.setItem('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(logInUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(logOutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logOutUser.fulfilled, (state) => {
        state.loading = false;
        state.accessToken = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      })
      .addCase(logOutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
export const { logOut, tokensUpdated } = authLogInSlice.actions;
export default authLogInSlice.reducer;
