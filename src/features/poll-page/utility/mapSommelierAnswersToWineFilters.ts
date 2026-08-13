import { SommelierAnswers } from '@/store/Poll/sommelierSlice';
import { MergedParams } from '@/shared/types/MergedParams';

export function sommelierAnswersToParams(
  answers: SommelierAnswers
): MergedParams {
  return {
    name: '',
    filters: {
      page: 0,
      wineTypes: [],
      countryIds: [],
      regionIds: [],
      producerIds: [],
      vintages: [],
      agingTypes: [],
      grapeIds: [],
      minAlcohol: answers.alcohol.minAlcohol,
      maxAlcohol: answers.alcohol.maxAlcohol,
      sugarTypes: answers.sweetness ? [answers.sweetness.code] : [],
      foods: answers.food,
      minPrice: answers.budget.minPrice,
      maxPrice: answers.budget.maxPrice,
    },
  };
}
