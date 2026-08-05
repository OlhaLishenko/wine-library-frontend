import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import styles from './Input.module.scss';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Required for the `<label htmlFor>` association. */
  id: string;
  label: string;
  /** Inline validation message. Applies error styling + `aria-invalid`. */
  error: string | null;
  /** Optional element rendered inside the field, right-aligned (e.g. a toggle). */
  trailing?: ReactNode;
}

/** Labelled text input with hover / focus / filled / error states. */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { id, label, error, trailing, ...rest },
  ref
) {
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <div className={`${styles.control}${error ? ` ${styles.hasError}` : ''}`}>
        <input
          id={id}
          ref={ref}
          className={styles.input}
          aria-invalid={error ? true : undefined}
          aria-describedby={errorId}
          {...rest}
        />
        {trailing ? <span className={styles.trailing}>{trailing}</span> : null}
      </div>
      {error ? (
        <p id={errorId} className={styles.error} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
});
