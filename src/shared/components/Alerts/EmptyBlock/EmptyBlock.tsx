import React from 'react';
import styles from './EmptyBlock.module.scss';
import { Icons } from '@/assets/icons';
import { Button } from '@/features/auth/components/Button/Button';

type EmptyBlockProps = {
  text: string;
  subText: string;
  btnTitle: string;
  btnAction: () => void;
};

export const EmptyBlock: React.FC<EmptyBlockProps> = ({
  text,
  btnTitle,
  subText,
  btnAction,
}) => {
  return (
    <div className={styles.container}>
      <section className={styles.imageContainer}>
        <Icons.ErrorLike />
      </section>
      <span className={styles.text}>{text}</span>
      <span className={styles.subText}>{subText}</span>
      <Button onClick={btnAction}>{btnTitle}</Button>
    </div>
  );
};
