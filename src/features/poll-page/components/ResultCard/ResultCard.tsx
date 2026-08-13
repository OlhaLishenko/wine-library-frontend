import React from 'react';
import styles from './ResultCard.module.scss';
import { WineType } from '@/shared/types/WineType';
import { getImageUrl } from '@/utility/getImageUrl';

type ResultCardProps = {
  wine: WineType;
};

export const ResultCard: React.FC<ResultCardProps> = ({ wine }) => {
  return (
    <article className={styles.card}>
      <div className={styles.imageContainer} aria-hidden="true">
        <img
          className={styles.image}
          src={getImageUrl(`${wine.imageUrl}`)}
          alt={wine.name}
        />
      </div>
      <div className={styles.info}>
        <h2 className={styles.wineName}>{wine.name}</h2>
        <p className={styles.origin}>
          {wine.region}, {wine.country} · {wine.vintage} · {wine.vintage}
        </p>
        <p className={styles.note}>{wine.country}</p>
        <dl className={styles.specs}>
          {wine.foods.length > 0 && (
            <div>
              <dt>Food</dt>
              {wine.foods.map((food) => (
                <dd key={food.id}>{food.name}</dd>
              ))}
            </div>
          )}
          <div>
            <dt>Sweetness</dt>
            <dd>{wine.sugarType}</dd>
          </div>
          <div>
            <dt>Budget</dt>
            <dd>{wine.price}</dd>
          </div>
          <div>
            <dt>ABV</dt>
            <dd>{wine.alcohol}%</dd>
          </div>
        </dl>
      </div>
    </article>
  );
};
