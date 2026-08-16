export type WineFilterKey =
  | 'wineTypes'
  | 'sugarTypes'
  | 'countryIds'
  | 'regionIds'
  | 'producerIds'
  | 'vintages'
  | 'agingTypes'
  | 'grapeIds'
  | 'foods'
  | 'volumes';

export type WineFilters = Partial<Record<WineFilterKey, string[]>> & {
  page?: number;
  minAlcohol?: number;
  maxAlcohol?: number;
  minPrice?: number;
  maxPrice?: number;
};
