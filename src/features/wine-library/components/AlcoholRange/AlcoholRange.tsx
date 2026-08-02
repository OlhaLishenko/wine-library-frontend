import { useCallback } from 'react';
import styles from './AlcoholRange.module.scss';
import { useWineFilters } from '../../hooks/useWineFilters';
import { TITLE } from '@/shared/constants/context';

const MIN = 8;
const MAX = 20;

export default function AlcoholRange({ min = MIN, max = MAX }) {
  const { updateFilters, filters } = useWineFilters();

  const percent = useCallback(
    (value: number) => ((value - min) / (max - min)) * 100,
    [min, max]
  );

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), filters.maxAlcohol - 1);
    updateFilters({ minAlcohol: value, maxAlcohol: filters.maxAlcohol });
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), filters.minAlcohol + 1);
    updateFilters({ minAlcohol: filters.minAlcohol, maxAlcohol: value });
  };

  const indicator = TITLE.library.productCard.alcoholIndicator;
  const { rangeTitle } = TITLE.library;

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <span className={styles.title}>{rangeTitle}</span>
      </div>

      <div className={styles.sliderTrack}>
        <div className={styles.rail} />
        <div
          className={styles.railFill}
          style={{
            left: `${percent(filters.minAlcohol)}${indicator}`,
            width: `${percent(filters.maxAlcohol) - percent(filters.minAlcohol)}${indicator}`,
          }}
        />
        <input
          type="range"
          className={styles.input}
          min={min}
          max={max}
          value={filters.minAlcohol}
          onChange={handleMinChange}
          aria-label="Minimum alcohol ABV percent"
        />
        <input
          type="range"
          className={styles.input}
          min={min}
          max={max}
          value={filters.maxAlcohol}
          onChange={handleMaxChange}
          aria-label="Maximum alcohol ABV percent"
        />
      </div>

      <div className={styles.labels}>
        <span>
          {filters.minAlcohol}
          {indicator}
        </span>
        <span>
          {filters.maxAlcohol}
          {indicator}
        </span>
      </div>
    </div>
  );
}
