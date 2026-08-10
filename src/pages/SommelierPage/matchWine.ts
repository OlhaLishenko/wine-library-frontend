import { SommelierAnswers } from '@/store/Poll/sommelierSlice';

export interface Wine {
  id: string;
  name: string;
  winery: string;
  region: string;
  country: string;
  vintage: number;
  type: string;
  grape: string;
  sweetness: string;
  body: string;
  alcohol: number;
  note: string;
}

/** Curated subset used to demonstrate the match — swap for the live catalog. */
export const wines: Wine[] = [
  {
    id: 'w1',
    name: 'Château Vermont Réserve',
    winery: 'Château Vermont',
    region: 'Bordeaux',
    country: 'France',
    vintage: 2018,
    type: 'Red',
    grape: 'Cabernet Sauvignon',
    sweetness: 'Dry',
    body: 'Full',
    alcohol: 13.5,
    note: 'Blackcurrant, cedar and a long graphite finish.',
  },
  {
    id: 'w2',
    name: 'Belletti Barolo',
    winery: 'Cascina Belletti',
    region: 'Piedmont',
    country: 'Italy',
    vintage: 2017,
    type: 'Red',
    grape: 'Nebbiolo',
    sweetness: 'Dry',
    body: 'Full',
    alcohol: 14,
    note: 'Rose petal, tar and dried cherry, firm tannins.',
  },
  {
    id: 'w3',
    name: 'Marlborough Sauvignon Blanc',
    winery: 'Kōwhai Ridge',
    region: 'Marlborough',
    country: 'New Zealand',
    vintage: 2023,
    type: 'White',
    grape: 'Sauvignon Blanc',
    sweetness: 'Dry',
    body: 'Light',
    alcohol: 12.5,
    note: 'Passionfruit, lime zest, crisp and vibrant.',
  },
  {
    id: 'w4',
    name: 'Ribera del Duero Crianza',
    winery: 'Bodegas Alvear',
    region: 'Ribera del Duero',
    country: 'Spain',
    vintage: 2019,
    type: 'Red',
    grape: 'Tempranillo',
    sweetness: 'Dry',
    body: 'Medium',
    alcohol: 14.5,
    note: 'Plum, vanilla oak and soft, rounded tannins.',
  },
  {
    id: 'w5',
    name: 'Chablis Premier Cru',
    winery: 'Domaine Laroche',
    region: 'Burgundy',
    country: 'France',
    vintage: 2021,
    type: 'White',
    grape: 'Chardonnay',
    sweetness: 'Dry',
    body: 'Medium',
    alcohol: 12.5,
    note: 'Flint, green apple and saline minerality.',
  },
  {
    id: 'w7',
    name: 'Mosel Riesling Kabinett',
    winery: 'Weingut Hessen',
    region: 'Mosel',
    country: 'Germany',
    vintage: 2022,
    type: 'White',
    grape: 'Riesling',
    sweetness: 'Off-dry',
    body: 'Light',
    alcohol: 8.5,
    note: 'Green apple, honey and racy acidity.',
  },
  {
    id: 'w9',
    name: 'Provence Rosé',
    winery: 'Domaine Sainte Anne',
    region: 'Provence',
    country: 'France',
    vintage: 2023,
    type: 'Rosé',
    grape: 'Grenache',
    sweetness: 'Dry',
    body: 'Light',
    alcohol: 12.5,
    note: 'Wild strawberry, citrus peel, bone dry.',
  },
  {
    id: 'w10',
    name: 'Barossa Shiraz',
    winery: 'Ironbark Estate',
    region: 'Barossa Valley',
    country: 'Australia',
    vintage: 2018,
    type: 'Red',
    grape: 'Shiraz',
    sweetness: 'Dry',
    body: 'Full',
    alcohol: 15,
    note: 'Blackberry, pepper and warm spice.',
  },
  {
    id: 'w11',
    name: 'Champagne Brut Réserve',
    winery: 'Maison Devereux',
    region: 'Champagne',
    country: 'France',
    vintage: 2016,
    type: 'Sparkling',
    grape: 'Chardonnay / Pinot Noir',
    sweetness: 'Dry',
    body: 'Light',
    alcohol: 12,
    note: 'Brioche, citrus and fine, persistent bubbles.',
  },
  {
    id: 'w12',
    name: 'Douro Valley Tinto',
    winery: 'Quinta do Serrado',
    region: 'Douro',
    country: 'Portugal',
    vintage: 2020,
    type: 'Red',
    grape: 'Touriga Nacional',
    sweetness: 'Dry',
    body: 'Full',
    alcohol: 14,
    note: 'Fig, violet and warm baking spice.',
  },
];

const pairingType: Record<string, string> = {
  'Red meat': 'Red',
  Poultry: 'White',
  'Fish & seafood': 'White',
  Cheese: 'Red',
  Spicy: 'White',
  Dessert: 'Sparkling',
};

/** Simple weighted scorer — returns the best match plus a 0–100 confidence. */
export function matchWine(answers: SommelierAnswers): {
  wine: Wine;
  score: number;
} {
  const scored = wines.map((wine) => {
    let score = 0;
    let max = 0;

    max += 4;
    if (answers.wineType === 'Any' || answers.wineType === wine.type)
      score += 4;

    max += 2;
    if (answers.sweetness === 'Any' || !answers.sweetness) score += 1;
    else if (answers.sweetness === wine.sweetness) score += 2;

    max += 2;
    if (!answers.body) score += 1;
    else if (answers.body === wine.body) score += 2;

    max += 2;
    if (wine.alcohol >= answers.abv.min && wine.alcohol <= answers.abv.max)
      score += 2;

    const pairings = answers.pairings.filter((p) => pairingType[p]);
    if (pairings.length) {
      max += 2;
      if (pairings.some((p) => pairingType[p] === wine.type)) score += 2;
    }

    // Celebration & gift nudge toward sparkling / fuller bottles.
    if (answers.occasion === 'Celebration' || answers.occasion === 'Gift') {
      max += 1;
      if (wine.type === 'Sparkling' || wine.body === 'Full') score += 1;
    }

    return { wine, ratio: max ? score / max : 0 };
  });

  scored.sort((a, b) => b.ratio - a.ratio);
  const best = scored[0];
  return { wine: best.wine, score: Math.round(best.ratio * 100) };
}
