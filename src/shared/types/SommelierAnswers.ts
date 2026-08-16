export interface PriceRange {
  minPrice: number;
  maxPrice: number;
}

export interface AlcoholRange {
  minAlcohol: number;
  maxAlcohol: number;
}

export interface SweetnessValue {
  code: string;
  name: string;
}

export interface SommelierAnswers {
  sweetness: SweetnessValue[];
  budget: PriceRange;
  food: string[];
  alcohol: AlcoholRange;
}
