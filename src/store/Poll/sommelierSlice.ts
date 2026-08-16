import {
  AlcoholRange,
  PriceRange,
  SommelierAnswers,
  SweetnessValue,
} from '@/shared/types/SommelierAnswers';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
export interface SommelierState {
  step: number;
  answers: SommelierAnswers;
}

const initialState: SommelierState = {
  step: 0,
  answers: {
    sweetness: [],
    budget: { minPrice: 10, maxPrice: 750 },
    food: [],
    alcohol: { minAlcohol: 11, maxAlcohol: 15 },
  },
};
interface SingleAnswerMap {
  sweetness: SweetnessValue[];
  budget: PriceRange;
  alcohol: AlcoholRange;
}

type SingleKey = keyof SingleAnswerMap;

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
    setSingle<K extends SingleKey>(
      state: SommelierState,
      action: PayloadAction<{ key: K; value: SingleAnswerMap[K] }>
    ) {
      state.answers[action.payload.key] = action.payload.value as never;
    },
    togglePairing(state, action: PayloadAction<string>) {
      const list = state.answers.food;
      const i = list.indexOf(action.payload);
      if (i === -1) list.push(action.payload);
      else list.splice(i, 1);
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
  resetSommelier,
} = sommelierSlice.actions;

export default sommelierSlice.reducer;
