import React from 'react';
import styles from './PourPlanResults.module.scss';
import { Button } from '@/shared/components/Button/Button';
import { WINE_TYPE_COLORS } from '@/shared/constants/wineTypeColors';

const STATS = [
  { value: '7.5', label: 'Liters' },
  { value: '50', label: 'Glasses' },
  { value: '4.2 gl', label: 'Per guest' },
];

const BREAKDOWN = [
  { label: 'Red', color: WINE_TYPE_COLORS.red, bottles: 5, share: 50 },
  { label: 'White', color: WINE_TYPE_COLORS.white, bottles: 3, share: 30 },
  { label: 'Rosé', color: WINE_TYPE_COLORS.rose, bottles: 1, share: 10 },
  { label: 'Sparkling', color: WINE_TYPE_COLORS.sparkling, bottles: 1, share: 10 },
];

type PourPlanResultsProps = {
  guests: number;
  duration: number;
};

export const PourPlanResults: React.FC<PourPlanResultsProps> = ({
  guests,
  duration,
}) => {
  return (
    <section className={styles.results}>
      <span className={styles.eyebrow}>Here&apos;s what we&apos;d recommend</span>
      <p className={styles.subtitle}>
        For your dinner of {guests} guests over {duration} hours.
      </p>

      <div className={styles.bottleCount}>
        <span className={styles.bottleNumber}>10</span>
        <span className={styles.bottleLabel}>bottles</span>
      </div>

      <div className={styles.statRow}>
        {STATS.map((stat) => (
          <div className={styles.stat} key={stat.label}>
            <span className={styles.statValue}>{stat.value}</span>
            <span className={styles.statLabel}>{stat.label}</span>
          </div>
        ))}
      </div>

      <div className={styles.bar}>
        {BREAKDOWN.map((item) => (
          <div
            key={item.label}
            className={styles.barSegment}
            style={{ flexBasis: `${item.share}%`, backgroundColor: item.color }}
          />
        ))}
      </div>

      <ul className={styles.breakdownList}>
        {BREAKDOWN.map((item) => (
          <li className={styles.breakdownRow} key={item.label}>
            <span className={styles.breakdownLabel}>
              <span
                className={styles.breakdownDot}
                style={{ backgroundColor: item.color }}
              />
              {item.label}
            </span>
            <span className={styles.breakdownValue}>
              {item.bottles} {item.bottles === 1 ? 'bottle' : 'bottles'}
            </span>
          </li>
        ))}
      </ul>

      <p className={styles.note}>
        Includes a 10% cushion. Better to have a little extra than an empty
        bottle.
      </p>

      <div className={styles.actions}>
        <Button fullWidth>Add wines to event</Button>
        <Button fullWidth variant="ghost">
          Adjust plan
        </Button>
      </div>
    </section>
  );
};
