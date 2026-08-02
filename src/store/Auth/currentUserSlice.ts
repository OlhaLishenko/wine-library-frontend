import { User } from '@/features/auth/types/User';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { logInUser } from './authLogInSlice';
// import { jwtDecode } from 'jwt-decode';
import { AuthResponse } from '@/features/auth/types/AuthResponse';
// import { JwtPayload } from '@/shared/types/JwtPayload';
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
        return getUserInfo(action.payload.token);
        // const decoded = jwtDecode<JwtPayload>(action.payload.token);
        // return {
        //   email: decoded.sub,
        //   fullName: decoded.fullName,
        // };
      }
    );
  },
});

export const { setCurrentUser, deleteCurrentUser } = currentUserSlice.actions;
export default currentUserSlice.reducer;
