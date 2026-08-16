import React from 'react';
import styles from './ResultCard.module.scss';
import { WineType } from '@/shared/types/WineType';
import { getImageUrl } from '@/utility/getImageUrl';
import { normolizeTitle } from '@/utility/normolizeTitle';
import { Link, useNavigate } from 'react-router';

type ResultCardProps = {
  wine: WineType;
};

export const ResultCard: React.FC<ResultCardProps> = ({ wine }) => {
  return (
    <Link to={`/wines/${wine.id}`} className={styles.card}>
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
          {wine.region}, {wine.country} · {wine.vintage}
        </p>
        <p className={styles.note}>{wine.country}</p>
        <dl className={styles.specs}>
          {wine.foods.length > 0 && (
            <div>
              <dt>Food</dt>
              {wine.foods.map((food) => (
                <dd key={food}>{food}</dd>
              ))}
            </div>
          )}
          <div>
            <dt>Sweetness</dt>
            <dd>{normolizeTitle(wine.sugarType)}</dd>
          </div>
          <div>
            <dt>Budget</dt>
            <dd>{wine.price} $</dd>
          </div>
          <div>
            <dt>ABV</dt>
            <dd>{wine.alcohol}%</dd>
          </div>
        </dl>
      </div>
    </Link>
  );
};
