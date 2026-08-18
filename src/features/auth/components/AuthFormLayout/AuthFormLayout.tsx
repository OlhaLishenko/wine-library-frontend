import { Button } from '../../../../shared/components/Button/Button';
import styles from './AuthFormLayout.module.scss';
import { Link, useLocation } from 'react-router';
import React, { ReactNode } from 'react';

type AuthFormLayoutType = {
  context: {
    title: string;
    subtitle: string;
    submitBtnTitle: string;
    bottomFormTitle: string;
    bottomFormBtn: string;
  };
  children: ReactNode;
  onSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void;
  loading?: boolean;
};

export function AuthFormLayout({
  context,
  children,
  onSubmit,
  loading = false,
}: AuthFormLayoutType) {
  const { title, subtitle, submitBtnTitle, bottomFormTitle, bottomFormBtn } =
    context;
  const location = useLocation();
  const linkTo = location.pathname === '/login' ? '/create-account' : '/login';

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <header className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
      </header>

      {children}

      <Button type="submit" fullWidth loading={loading}>
        {submitBtnTitle}
      </Button>

      <p className={styles.signup}>
        {bottomFormTitle}
        <Link to={linkTo} className={styles.signupLink}>
          {bottomFormBtn}
        </Link>
      </p>
    </form>
  );
}
