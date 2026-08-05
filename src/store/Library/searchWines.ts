import { getWinesService } from '@/services/getWines.service';
import { WineFilters } from '@/shared/types/WineFilters';
import { WineType } from '@/shared/types/WineType';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

type State = {
  wineList: WineType[];
  loading: boolean;
  error: string | null;
  isLast: boolean;
};

const initialState: State = {
  wineList: [],
  loading: false,
  error: null,
  isLast: false,
};

export const loadWineList = createAsyncThunk(
  'library/loadWineList',
  async (filters: WineFilters, { rejectWithValue }) => {
    try {
      const wineList = await getWinesService(filters);

      return wineList;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to load wines';
      return rejectWithValue(message);
    }
  }
);

export const wineListSlice = createSlice({
  name: 'wineList',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(loadWineList.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loadWineList.fulfilled, (state, action) => {
      state.wineList =
        action.payload.number === 0
          ? action.payload.content
          : [...state.wineList, ...action.payload.content];
      state.error = null;
      state.loading = false;
      state.isLast = action.payload.last;
    });
    builder.addCase(loadWineList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default wineListSlice.reducer;
