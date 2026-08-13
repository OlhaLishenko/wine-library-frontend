import { CheckIcon } from '../icons/Icons';
import styles from './ChoiceCard.module.scss';
import { IconsPoll } from '@/assets/icons';
import { IconPollName } from '@/shared/types/IconPollName';

export interface ChoiceCardProps {
  label: string;
  icon: IconPollName;
  selected: boolean;
  control?: 'radio' | 'checkbox';
  onSelect: () => void;
}

export function ChoiceCard({
  label,
  icon,
  selected,
  control = 'radio',
  onSelect,
}: ChoiceCardProps) {
  const Icon = IconsPoll[icon];
  return (
    <button
      type="button"
      className={[styles.card, selected ? styles.selected : '']
        .filter(Boolean)
        .join(' ')}
      aria-pressed={selected}
      onClick={onSelect}
    >
      <div className={styles.icon}>
        <div className={styles.iconContainer}>
          {Icon && <Icon className={styles.iconImage} />}
        </div>
      </div>
      <span className={styles.text}>
        <span className={styles.label}>{label}</span>
      </span>
      <span
        className={[
          styles.indicator,
          control === 'checkbox' ? styles.box : styles.ring,
        ].join(' ')}
        aria-hidden="true"
      >
        {control === 'checkbox' && selected && (
          <CheckIcon className={styles.check} />
        )}
      </span>
    </button>
  );
}
