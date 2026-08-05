import React from 'react';
import styles from './Avatar.module.scss';

type AvatarProps = {
  userEmail: string;
};

export const Avatar: React.FC<AvatarProps> = ({ userEmail }) => {
  return (
    <div className={styles.avatar}>
      <span>{userEmail[0].toUpperCase()}</span>
    </div>
  );
};
