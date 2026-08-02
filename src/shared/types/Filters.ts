import { WineFilterKey } from './WineFilters';

export interface FiterObj {
  wineTypes: Filter;
  sugarTypes: Filter;
  countryIds: Filter;
  regionIds: Filter;
  producerIds: Filter;
  grapeIds: Filter;
  agingTypes: Filter;
  volumes: Filter;
  vintages: Filter;
}

export type FilterValue = {
  name: string;
} & ({ code: string } | { id: number });

export type Filter = {
  filterName: WineFilterKey;
  label: string;
  values: FilterValue[];
};
