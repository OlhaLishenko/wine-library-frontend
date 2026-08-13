import { WineType } from '@/shared/types/WineType';
import { SommelierAnswers } from '@/store/Poll/sommelierSlice';

// Wine, wines, pairingType — залишаю як були у вас (не показані в фрагменті)

/** Simple weighted scorer — returns the best match plus a 0–100 confidence. */
export function matchWine(answers: SommelierAnswers): {
  wine: WineType;
  score: number;
} {
  const scored = wines.map((wine) => {
    let score = 0;
    let max = 0;

    // Budget: ціна вина має потрапляти в обраний діапазон
    max += 4;
    if (
      wine.price >= answers.budget.minPrice &&
      wine.price <= answers.budget.maxPrice
    ) {
      score += 4;
    }

    // Sweetness: null означає "без переваги"
    max += 2;
    if (!answers.sweetness) score += 1;
    else if (answers.sweetness.code === wine.sweetness) score += 2;

    // Alcohol range
    max += 2;
    if (
      wine.alcohol >= answers.alcohol.minAlcohol &&
      wine.alcohol <= answers.alcohol.maxAlcohol
    ) {
      score += 2;
    }

    // Food pairing
    const pairings = answers.food.filter((p) => pairingType[p]);
    if (pairings.length) {
      max += 2;
      if (pairings.some((p) => pairingType[p] === wine.type)) score += 2;
    }

    return { wine, ratio: max ? score / max : 0 };
  });

  scored.sort((a, b) => b.ratio - a.ratio);
  const best = scored[0];
  return { wine: best.wine, score: Math.round(best.ratio * 100) };
}
