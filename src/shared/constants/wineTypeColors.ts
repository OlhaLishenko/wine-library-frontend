// Mirrors the $color-wine-* tokens in src/styles/_variables.scss, for the
// handful of places (inline slider/legend colors) that need the value in JS.
export const WINE_TYPE_COLORS = {
  red: '#b23a52',
  white: '#f5ede4',
  rose: '#e8a9c0',
  sparkling: '#d4af37',
} as const;

export type WineTypeColorKey = keyof typeof WINE_TYPE_COLORS;
