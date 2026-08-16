import { SommelierAnswers } from '@/shared/types/SommelierAnswers';
import { WineFilters } from '@/shared/types/WineFilters';

export function sommelierAnswersToParams(
  answers: SommelierAnswers
): WineFilters {
  const filters = {
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
  };

  return filters;
}
