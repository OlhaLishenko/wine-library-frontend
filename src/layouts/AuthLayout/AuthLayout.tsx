import { useContext, type ReactNode } from 'react';
import { Logo } from '../../features/auth/components/Logo/Logo';
import styles from './AuthLayout.module.scss';
import { ModalScreenContext } from '@/features/auth/hooks/modalScreen.context';
import classNames from 'classnames';

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
  const { openModal } = useContext(ModalScreenContext);

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
        <div className={styles.separator}></div>
      </div>

      <div className={styles.formWrapper}>
        <Logo />
        <main className={styles.formContainer}>{children}</main>
      </div>
    </div>
  );
}
