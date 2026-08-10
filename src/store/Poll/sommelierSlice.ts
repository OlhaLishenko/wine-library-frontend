import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface AbvRange {
  min: number;
  max: number;
}

export interface SommelierAnswers {
  wineType: string | null;
  sweetness: string | null;
  body: string | null;
  occasion: string | null;
  /** Multi-select food pairings. */
  pairings: string[];
  abv: AbvRange;
}

export interface SommelierState {
  /** Current question index. Equal to the question count means the result screen. */
  step: number;
  answers: SommelierAnswers;
}

const initialState: SommelierState = {
  step: 0,
  answers: {
    wineType: null,
    sweetness: null,
    body: null,
    occasion: null,
    pairings: [],
    abv: { min: 11, max: 15 },
  },
};

type SingleKey = 'wineType' | 'sweetness' | 'body' | 'occasion';

export const sommelierSlice = createSlice({
  name: 'sommelier',
  initialState,
  reducers: {
    goToStep(state, action: PayloadAction<number>) {
      state.step = action.payload;
    },
    nextStep(state) {
      state.step += 1;
    },
    prevStep(state) {
      state.step = Math.max(0, state.step - 1);
    },
    setSingle(state, action: PayloadAction<{ key: SingleKey; value: string }>) {
      state.answers[action.payload.key] = action.payload.value;
    },
    togglePairing(state, action: PayloadAction<string>) {
      const list = state.answers.pairings;
      const i = list.indexOf(action.payload);
      if (i === -1) list.push(action.payload);
      else list.splice(i, 1);
    },
    setAbv(state, action: PayloadAction<AbvRange>) {
      state.answers.abv = action.payload;
    },
    resetSommelier() {
      return initialState;
    },
  },
});

export const {
  goToStep,
  nextStep,
  prevStep,
  setSingle,
  togglePairing,
  setAbv,
  resetSommelier,
} = sommelierSlice.actions;

export default sommelierSlice.reducer;
