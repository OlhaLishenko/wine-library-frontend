import type { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.scss';

export type ButtonVariant = 'primary' | 'ghost' | 'filter';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
  /** Shows a spinner and disables the button. */
  loading?: boolean;
}

/** Primary / ghost button with hover, focus, active, disabled & loading states. */
export function Button({
  variant = 'primary',
  fullWidth = false,
  loading = false,
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
      <span className={styles.label}>{children}</span>
    </button>
  );
}
