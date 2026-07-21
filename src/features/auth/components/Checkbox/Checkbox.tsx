import type { InputHTMLAttributes } from 'react';
import { CheckIcon } from '../icons/Icons';
import styles from './Checkbox.module.scss';

export interface CheckboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type'
> {
  id: string;
  label: string;
}

/** Custom-styled checkbox backed by a real, accessible native input. */
export function Checkbox({ id, label, ...rest }: CheckboxProps) {
  return (
    <span className={styles.wrap}>
      <input id={id} type="checkbox" className={styles.input} {...rest} />
      <label htmlFor={id} className={styles.labelRow}>
        <span className={styles.box} aria-hidden="true">
          <CheckIcon className={styles.check} />
        </span>
        <span className={styles.text}>{label}</span>
      </label>
    </span>
  );
}
