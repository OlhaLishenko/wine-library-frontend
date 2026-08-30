import React from 'react';
import styles from './PourPlanWineCard.module.scss';
import { Line } from '@/shared/components/Line';

type PourPlanWineCardProps = {
  type: string;
  color: string;
  rating: number;
  name: string;
  subtitle: string;
  note: string;
  bottles: number;
  price: number;
};

export const PourPlanWineCard: React.FC<PourPlanWineCardProps> = ({
  type,
  color,
  rating,
  name,
  subtitle,
  note,
  bottles,
  price,
}) => {
  return (
    <article className={styles.card}>
      <div className={styles.topRow}>
        <span
          className={styles.tag}
          style={{ color, borderColor: color, backgroundColor: `${color}26` }}
        >
          {type}
        </span>
        <span className={styles.rating}>★ {rating}</span>
      </div>

      <div className={styles.info}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>

      <p className={styles.note}>{note}</p>

      <Line />

      <div className={styles.bottomRow}>
        <span className={styles.bottles}>
          {bottles} {bottles === 1 ? 'bottle' : 'bottles'}{' '}
          <span className={styles.forEvent}>for this event</span>
        </span>
        <span className={styles.price}>${price}</span>
      </div>
    </article>
  );
};
