import React from 'react';
import styles from './PourPlanLibrarySection.module.scss';
import { Link } from 'react-router';
import { PourPlanWineCard } from '../PourPlanWineCard/PourPlanWineCard';
import { WINE_TYPE_COLORS } from '@/shared/constants/wineTypeColors';

const RECOMMENDATIONS = [
  {
    type: 'Red',
    color: WINE_TYPE_COLORS.red,
    rating: 4.8,
    name: 'Belletti Barolo',
    subtitle: 'Cascina Belletti · Piedmont · 2017',
    note: 'Rose petal, tar and dried cherry, firm tannins.',
    bottles: 5,
    price: 84,
  },
  {
    type: 'White',
    color: WINE_TYPE_COLORS.white,
    rating: 4.7,
    name: 'Chablis Premier Cru',
    subtitle: 'Domaine Laroche · Burgundy · 2021',
    note: 'Flint, green apple and saline minerality.',
    bottles: 3,
    price: 52,
  },
  {
    type: 'Rosé',
    color: WINE_TYPE_COLORS.rose,
    rating: 4,
    name: 'Provence Rosé',
    subtitle: 'Domaine Sainte Anne · Provence · 2023',
    note: 'Wild strawberry, citrus peel, bone dry.',
    bottles: 1,
    price: 24,
  },
  {
    type: 'Sparkling',
    color: WINE_TYPE_COLORS.sparkling,
    rating: 4.9,
    name: 'Champagne Brut Réserve',
    subtitle: 'Maison Devereux · Champagne · 2016',
    note: 'Brioche, citrus and fine, persistent bubbles.',
    bottles: 1,
    price: 95,
  },
];

type PourPlanLibrarySectionProps = {
  guests: number;
};

export const PourPlanLibrarySection: React.FC<PourPlanLibrarySectionProps> = ({
  guests,
}) => {
  return (
    <section className={styles.library}>
      <div className={styles.head}>
        <h2 className={styles.title}>From your library</h2>
        <p className={styles.subtitle}>
          For your dinner of {guests} guests: 5 red, 3 white, 1 rosé, 1
          sparkling.
        </p>
        <Link to="/library" className={styles.browseLink}>
          Browse the full catalog ›
        </Link>
      </div>

      <div className={styles.list}>
        {RECOMMENDATIONS.map((wine) => (
          <PourPlanWineCard key={wine.name} {...wine} />
        ))}
      </div>
    </section>
  );
};
