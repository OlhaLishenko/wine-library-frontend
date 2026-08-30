import React from 'react';
import styles from './PourPlanOccasionChip.module.scss';
import clsx from 'clsx';

type PourPlanOccasionChipProps = {
  label: string;
  selected: boolean;
  onSelect: () => void;
};

export const PourPlanOccasionChip: React.FC<PourPlanOccasionChipProps> = ({
  label,
  selected,
  onSelect,
}) => {
  return (
    <button
      type="button"
      className={clsx(styles.chip, selected && styles.selected)}
      aria-pressed={selected}
      onClick={onSelect}
    >
      {label}
    </button>
  );
};
