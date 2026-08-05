import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { authRegisterSlice } from './Auth/authRegisterSlice';
import { authLogInSlice } from './Auth/authLogInSlice';
import { currentUserSlice } from './Auth/currentUserSlice';
import { wineListSlice } from './Library/wineListSlice';

const rootReducer = combineSlices(
  authLogInSlice,
  authRegisterSlice,
  currentUserSlice,
  wineListSlice
);

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
