import type { ReactNode } from 'react';
import { CheckIcon } from '../icons/Icons';
import styles from './ChoiceCard.module.scss';

export interface ChoiceCardProps {
  label: string;
  hint?: string;
  icon?: ReactNode;
  selected: boolean;
  /** 'radio' shows a ring indicator, 'checkbox' shows a tick — purely visual. */
  control?: 'radio' | 'checkbox';
  onSelect: () => void;
}

/**
 * Selectable option tile used across the sommelier questionnaire. Renders as a
 * real <button> so it is keyboard- and screen-reader-operable; the parent owns
 * single- vs multi-select semantics.
 */
export function ChoiceCard({
  label,
  hint,
  icon,
  selected,
  control = 'radio',
  onSelect,
}: ChoiceCardProps) {
  return (
    <button
      type="button"
      className={[styles.card, selected ? styles.selected : ''].filter(Boolean).join(' ')}
      aria-pressed={selected}
      onClick={onSelect}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      <span className={styles.text}>
        <span className={styles.label}>{label}</span>
        {hint && <span className={styles.hint}>{hint}</span>}
      </span>
      <span
        className={[
          styles.indicator,
          control === 'checkbox' ? styles.box : styles.ring,
        ].join(' ')}
        aria-hidden="true"
      >
        {control === 'checkbox' && selected && <CheckIcon className={styles.check} />}
      </span>
    </button>
  );
}
