import { favoritesService } from '@/services/favorites.service';
import { FavoriteItem } from '@/shared/types/FavoriteItem';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
type State = {
  localFavoriteList: FavoriteItem[];
  loader: boolean;
  error: null | string;
};

const initialState: State = {
  localFavoriteList: [],
  loader: false,
  error: null,
};

export const getFavoriteList = createAsyncThunk(
  'favorites/get',
  async (_, { rejectWithValue }) => {
    try {
      const list = await favoritesService.getList();

      return list;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Failed to load wines';
      return rejectWithValue(message);
    }
  }
);

export const getFavoriteListSlice = createSlice({
  name: 'favoriteList',
  initialState,
  reducers: {
    setLocalFavoriteList(state, action: PayloadAction<FavoriteItem[]>) {
      state.localFavoriteList = action.payload;
    },

    removeLocalFavoriteItem(state, action: PayloadAction<number>) {
      state.localFavoriteList = state.localFavoriteList.filter(
        (item) => item.wine.id !== action.payload
      );
    },

    // saveLocalFavoriteItem(state, action: PayloadAction<FavoriteItem>) {
    //   state.localFavoriteList = [...state.localFavoriteList, action.payload];
    // },

    saveLocalFavoriteItem(state, action: PayloadAction<FavoriteItem>) {
      const exists = state.localFavoriteList.some(
        (item: FavoriteItem) => item.wine.id === action.payload.wine.id
      );
      if (!exists) {
        state.localFavoriteList = [...state.localFavoriteList, action.payload];
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(getFavoriteList.pending, (state) => {
      state.loader = true;
      state.error = null;
    });
    builder.addCase(getFavoriteList.fulfilled, (state, action) => {
      state.loader = false;
      state.error = null;
      state.localFavoriteList = action.payload;
    });
    builder.addCase(getFavoriteList.rejected, (state, action) => {
      state.loader = false;
      state.error = action.payload as string;
      state.localFavoriteList = [];
    });
  },
});
export const {
  setLocalFavoriteList,
  removeLocalFavoriteItem,
  saveLocalFavoriteItem,
} = getFavoriteListSlice.actions;
export default getFavoriteListSlice.reducer;
