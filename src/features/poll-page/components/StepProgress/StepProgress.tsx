import styles from './StepProgress.module.scss';

export interface StepProgressProps {
  current: number;
  total: number;
}

export function StepProgress({ current, total }: StepProgressProps) {
  const answered = Math.min(current, total);
  const pct = Math.round((answered / total) * 100);

  return (
    <div className={styles.wrap}>
      <div className={styles.meta}>
        <span className={styles.count}>
          Question <strong>{Math.min(current + 1, total)}</strong> of {total}
        </span>
        <span className={styles.pct}>{pct}% complete</span>
      </div>
      <div
        className={styles.track}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={answered}
        aria-label="Questionnaire progress"
      >
        {Array.from({ length: total }, (_, i) => (
          <span
            key={i}
            className={[
              styles.segment,
              i < current ? styles.done : '',
              i === current ? styles.active : '',
            ]
              .filter(Boolean)
              .join(' ')}
          />
        ))}
      </div>
    </div>
  );
}
