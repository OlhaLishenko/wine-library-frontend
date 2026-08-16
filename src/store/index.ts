import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { authRegisterSlice } from './Auth/authRegisterSlice';
import { authLogInSlice } from './Auth/authLogInSlice';
import { currentUserSlice } from './Auth/currentUserSlice';
import { wineListSlice } from './Library/wineListSlice';
import { getFavoriteListSlice } from './Favorites/getFavorites';
import { saveToFavoritesSlice } from './Favorites/savetoFavorites';
import { sommelierSlice } from './Poll/sommelierSlice';
import { pollSlice } from './Poll/pollSlice';

const rootReducer = combineSlices(
  authLogInSlice,
  authRegisterSlice,
  currentUserSlice,
  wineListSlice,
  getFavoriteListSlice,
  saveToFavoritesSlice,
  sommelierSlice,
  pollSlice
);

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
