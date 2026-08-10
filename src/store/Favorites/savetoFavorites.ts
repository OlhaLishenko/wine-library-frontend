import { favoritesService } from '@/services/favorites.service';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
type State = {
  loader: boolean;
  error: null | string;
};

const initialState: State = {
  loader: false,
  error: null,
};

export const seveItemToFavorites = createAsyncThunk(
  'favorites/save',
  async (id: number, { rejectWithValue }) => {
    try {
      await favoritesService.saveItem(id);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Failed to load wines';
      return rejectWithValue(message);
    }
  }
);

export const saveToFavoritesSlice = createSlice({
  name: 'saveFavorite',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(seveItemToFavorites.pending, (state) => {
      state.loader = true;
      state.error = null;
    });
    builder.addCase(seveItemToFavorites.fulfilled, (state) => {
      state.loader = false;
      state.error = null;
      // state.favoriteList = action.payload;
    });
    builder.addCase(seveItemToFavorites.rejected, (state, action) => {
      state.loader = false;
      state.error = action.payload as string;
      // state.favoriteList = action.payload;
    });
  },
});

export default saveToFavoritesSlice.reducer;
