export type WineFilterKey =
  | 'wineTypes'
  | 'sugarTypes'
  | 'countryIds'
  | 'regionIds'
  | 'producerIds'
  | 'vintages'
  | 'agingTypes'
  | 'grapeIds'
  | 'volumes';

export type WineFilters = Partial<Record<WineFilterKey, string[]>> & {
  page?: number;
  minAlcohol?: number;
  maxAlcohol?: number;
};
