import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { authRegisterSlice } from './Auth/authRegisterSlice';
import { authLogInSlice } from './Auth/authLogInSlice';

const rootReducer = combineSlices(authLogInSlice, authRegisterSlice);

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
