import { User } from '@/features/auth/types/User';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { logInUser } from './authLogInSlice';
import { AuthResponse } from '@/features/auth/types/AuthResponse';
import { getUserInfo } from '@/utility/getUserInfo';

const initialState: User | null = null;

export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    setCurrentUser: (_state, action) => {
      return action.payload;
    },
    deleteCurrentUser: () => {
      return null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      logInUser.fulfilled,
      (_state, action: PayloadAction<AuthResponse>) => {
        return getUserInfo(action.payload.accessToken);
      }
    );
  },
});

export const { setCurrentUser, deleteCurrentUser } = currentUserSlice.actions;
export default currentUserSlice.reducer;
