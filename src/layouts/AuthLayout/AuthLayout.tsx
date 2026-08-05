import { useContext, type ReactNode } from 'react';
import { Logo } from '../../shared/components/Logo/Logo';
import styles from './AuthLayout.module.scss';
import { ModalScreenContext } from '@/features/auth/hooks/modalScreen.context';
import classNames from 'classnames';
import { SeparatorLine } from '@/shared/components/SeparatorLine';
import { ModalScreen } from '@/features/auth/components/ModalScreen';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { AuthInputsContext } from '@/features/auth/hooks/authInputs.context';
import { logInUser } from '@/store/Auth/authLogInSlice';
import { useNavigate } from 'react-router';

export interface AuthLayoutProps {
  children: ReactNode;
  quote?: string;
  bgImage: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
}

export function AuthLayout({ children, quote, bgImage }: AuthLayoutProps) {
  const { openModal, setOpenModal } = useContext(ModalScreenContext);
  const { error } = useAppSelector((state) => state.authLogIn);
  const { email, password, validate } = useContext(AuthInputsContext);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleResent = async () => {
    setOpenModal(false);
    if (!validate()) {
      return;
    }

    try {
      await dispatch(logInUser({ email, password })).unwrap();
      navigate('/library');
    } catch {
      setOpenModal(true);
      return;
    }
  };

  return (
    <div
      className={classNames(styles.layout, {
        [styles.disabled]: openModal,
      })}
    >
      {openModal && <div className={styles.disabled}></div>}
      <div className={styles.imageContainer}>
        <div
          style={
            {
              '--bg-mobile': `url(${bgImage.mobile})`,
              '--bg-tablet': `url(${bgImage.tablet})`,
              '--bg-desktop': `url(${bgImage.desktop})`,
            } as React.CSSProperties
          }
          className={styles.hero}
        >
          <p className={styles.quote}>{quote}</p>
        </div>
        <SeparatorLine margin="marginBottom: 60px" />
      </div>

      <div className={styles.formWrapper}>
        <Logo titleMode="center" />
        <main className={styles.formContainer}>{children}</main>
      </div>
      {openModal && error && (
        <ModalScreen message={error} onResent={handleResent} />
      )}
    </div>
  );
}
