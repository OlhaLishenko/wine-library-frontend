import { RegisterData } from '@/features/auth/types/RegisterData';
import { User } from '@/features/auth/types/User';
import { authService } from '@/services/auth.service';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

type AuthState = {
  user: User | null;
  loading: boolean;
  error: string | null;
};

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

export const registerUser = createAsyncThunk<
  User,
  RegisterData,
  { rejectValue: string }
>('auth/registerUser', async (credentials, { rejectWithValue }) => {
  try {
    const userData = {
      email: credentials.email,
      password: credentials.password,
      fullName: credentials.fullName,
    };
    const authUser: User = await authService.register(userData);
    return authUser;
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Untracked error';
    return rejectWithValue(message);
  }
});

export const authRegisterSlice = createSlice({
  name: 'authRegister',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Failed to register';
      });
  },
});

export default authRegisterSlice.reducer;
