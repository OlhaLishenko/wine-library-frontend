import React from 'react';
import styles from './PourPlanWelcome.module.scss';
import { Button } from '@/shared/components/Button/Button';
import { PourPlanStatCard } from '../PourPlanStatCard/PourPlanStatCard';

const STATS = [
  {
    title: '5 glasses',
    description: 'A standard 750ml bottle pours about five servings.',
  },
  {
    title: '+10%',
    description: 'We add a cushion so no one waits on the next bottle.',
  },
  {
    title: 'Your cellar',
    description: 'Suggestions come from wines already in your library.',
  },
];

type PourPlanWelcomeProps = {
  onStart: () => void;
};

export const PourPlanWelcome: React.FC<PourPlanWelcomeProps> = ({ onStart }) => {
  return (
    <div className={styles.welcome}>
      <span className={styles.badge}>Event Planning</span>

      <h1 className={styles.title}>
        Plan the perfect amount of wine for your event.
      </h1>

      <p className={styles.subtitle}>
        {`Tell us who's coming, what you're celebrating, and we'll help you figure out how much wine you'll need — then match it to bottles already in your library.`}
      </p>

      <div className={styles.actions}>
        <Button onClick={onStart}>Start Planning</Button>
        <span className={styles.helper}>Three questions, about a minute</span>
      </div>

      <div className={styles.stats}>
        {STATS.map((stat) => (
          <PourPlanStatCard key={stat.title} {...stat} />
        ))}
      </div>
    </div>
  );
};
