import React from 'react';
import styles from './UserInfoBlock.module.scss';
import clsx from 'clsx';
import { Avatar } from '../Avatar';
import { User } from '@/features/auth/types/User';

type UserInfoBlockProps = {
  user: User;
};

export const UserInfoBlock: React.FC<UserInfoBlockProps> = ({ user }) => {
  const { email, fullName } = user;
  return (
    <div className={styles.userInfoWrapper}>
      <div className={clsx(styles.userInfoContainer)}>
        <Avatar userEmail={email} />
        <div className={styles.userInfo}>
          <span className={clsx(styles.userTitle, styles.userName)}>
            {fullName}
          </span>
          <span className={styles.userTitle}>{email}</span>
        </div>
      </div>
    </div>
  );
};
