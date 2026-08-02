import { forwardRef, useState } from 'react';
import {
  Input,
  type InputProps,
} from '../../../../shared/components/Input/Input';
import { EyeIcon, EyeOffIcon } from '../icons/Icons';
import styles from './PasswordInput.module.scss';

export type PasswordInputProps = Omit<InputProps, 'type' | 'trailing'>;

/** Password field with a show/hide visibility toggle. */
export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  function PasswordInput(props, ref) {
    const [visible, setVisible] = useState(false);

    return (
      <Input
        {...props}
        ref={ref}
        type={visible ? 'text' : 'password'}
        trailing={
          <button
            type="button"
            className={styles.toggle}
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? 'Hide password' : 'Show password'}
            aria-pressed={visible}
          >
            {visible ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        }
      />
    );
  }
);
