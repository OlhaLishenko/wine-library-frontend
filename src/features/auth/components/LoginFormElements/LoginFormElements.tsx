import { Link } from 'react-router';
import styles from './LoginFormElements.module.scss';
import { BaseFormInput } from '../BaseFormInput/BaseFormInput';
import { AuthError } from '../../hooks/authInputs.context';

type LoginFormElementsType = {
  checkboxTitle: string;
  errors: AuthError | null;
};

export const LoginFormElements = ({
  checkboxTitle,
  errors,
}: LoginFormElementsType) => {
  return (
    <>
      <BaseFormInput errors={errors} />

      <div className={styles.meta}>
        <Link to="/forgot-password" className={styles.forgot}>
          {checkboxTitle}
        </Link>
      </div>
    </>
  );
};
