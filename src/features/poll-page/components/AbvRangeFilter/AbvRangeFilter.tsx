import { useCallback, useId, useMemo } from 'react';
import styles from './AbvRangeFilter.module.scss';

export interface AbvRange {
  min: number;
  max: number;
}

export interface AbvRangeFilterProps {
  /** Lowest selectable ABV %. Default: 8. */
  floor?: number;
  /** Highest selectable ABV %. Default: 20. */
  ceil?: number;
  /** Step between values. Default: 0.5. */
  step?: number;
  /** Current selected [min, max] range. */
  value: AbvRange;
  /** Fired with the next range whenever a thumb moves. */
  onChange: (next: AbvRange) => void;
  /** Section label. Default: "Alcohol · ABV %". */
  label?: string;
}

/**
 * Dual-thumb ABV (alcohol by volume) range filter.
 *
 * Two overlaid native range inputs keep it fully accessible and keyboard-
 * operable; the highlighted track between the thumbs is rendered from the
 * current values. UI only — lift the range into your store via `onChange`.
 */
export function AbvRangeFilter({
  floor = 8,
  ceil = 20,
  step = 0.5,
  value,
  onChange,
  label = 'Alcohol · ABV %',
}: AbvRangeFilterProps) {
  const groupId = useId();
  const span = ceil - floor;

  // Clamp helpers so the thumbs can never cross.
  const setMin = useCallback(
    (raw: number) => {
      const next = Math.min(raw, value.max - step);
      onChange({ min: Math.max(floor, next), max: value.max });
    },
    [value.max, step, floor, onChange],
  );

  const setMax = useCallback(
    (raw: number) => {
      const next = Math.max(raw, value.min + step);
      onChange({ min: value.min, max: Math.min(ceil, next) });
    },
    [value.min, step, ceil, onChange],
  );

  const { leftPct, rightPct } = useMemo(
    () => ({
      leftPct: ((value.min - floor) / span) * 100,
      rightPct: ((ceil - value.max) / span) * 100,
    }),
    [value.min, value.max, floor, ceil, span],
  );

  const fmt = (n: number) => `${Number.isInteger(n) ? n : n.toFixed(1)}%`;

  return (
    <div className={styles.filter}>
      <div className={styles.head}>
        <span className={styles.label} id={`${groupId}-label`}>
          {label}
        </span>
        <span className={styles.value} aria-hidden="true">
          {fmt(value.min)} – {fmt(value.max)}
        </span>
      </div>

      <div className={styles.slider}>
        <span className={styles.railBase} />
        <span
          className={styles.railFill}
          style={{ left: `${leftPct}%`, right: `${rightPct}%` }}
        />
        <input
          type="range"
          className={`${styles.thumb} ${styles.thumbMin}`}
          min={floor}
          max={ceil}
          step={step}
          value={value.min}
          onChange={(e) => setMin(Number(e.target.value))}
          aria-labelledby={`${groupId}-label`}
          aria-label="Minimum ABV"
          aria-valuetext={fmt(value.min)}
        />
        <input
          type="range"
          className={`${styles.thumb} ${styles.thumbMax}`}
          min={floor}
          max={ceil}
          step={step}
          value={value.max}
          onChange={(e) => setMax(Number(e.target.value))}
          aria-labelledby={`${groupId}-label`}
          aria-label="Maximum ABV"
          aria-valuetext={fmt(value.max)}
        />
      </div>

      <div className={styles.bounds} aria-hidden="true">
        <span>{fmt(floor)}</span>
        <span>{fmt(ceil)}</span>
      </div>
    </div>
  );
}
