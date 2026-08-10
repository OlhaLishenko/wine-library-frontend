import type { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.scss';
import clsx from 'clsx';

export type ButtonVariant = 'primary' | 'ghost' | 'filter' | 'narrow';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
  label?: string;
  /** Shows a spinner and disables the button. */
  loading?: boolean;
}

/** Primary / ghost button with hover, focus, active, disabled & loading states. */
export function Button({
  variant = 'primary',
  fullWidth = false,
  loading = false,
  label,
  disabled,
  children,
  ...rest
}: ButtonProps) {
  const className = [
    styles.button,
    styles[variant],
    fullWidth ? styles.fullWidth : '',
    loading ? styles.loading : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      className={className}
      disabled={disabled || loading}
      aria-busy={loading}
      {...rest}
    >
      {loading && <span className={styles.spinner} aria-hidden="true" />}
      <span
        className={clsx(styles.label, {
          [styles.labelFullWidth]: label === 'fullWidth',
        })}
      >
        {children}
      </span>
    </button>
  );
}
