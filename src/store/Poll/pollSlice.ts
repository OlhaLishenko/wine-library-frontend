import { sommelierAnswersToParams } from '@/features/poll-page/utility/mapSommelierAnswersToWineFilters';
import { getWinesService } from '@/services/getWines.service';
import { PageableResponse } from '@/shared/types/PageableResponse';
import { SommelierAnswers } from '@/shared/types/SommelierAnswers';
import { WineType } from '@/shared/types/WineType';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

type PollState = {
  wines: WineType[];
  loading: boolean;
  error: string | null;
};

const initialState: PollState = {
  wines: [],
  loading: false,
  error: null,
};

export const submitPoolAnswers = createAsyncThunk(
  'poll/submit',
  async (answers: SommelierAnswers, { rejectWithValue }) => {
    try {
      const params = sommelierAnswersToParams(answers);
      const wines = await getWinesService(params, 30);
      return wines;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to load wines';
      return rejectWithValue(message);
    }
  }
);

export const pollSlice = createSlice({
  name: 'pollResultList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitPoolAnswers.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        submitPoolAnswers.fulfilled,
        (state, action: PayloadAction<PageableResponse<WineType>>) => {
          state.wines = action.payload.content;
          state.loading = false;
        }
      )
      .addCase(
        submitPoolAnswers.rejected,
        (state, action: PayloadAction<unknown>) => {
          state.loading = false;
          state.error = action.payload as string;
        }
      );
  },
});

export default pollSlice.reducer;
