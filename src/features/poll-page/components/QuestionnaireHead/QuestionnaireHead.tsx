import React from 'react';
import styles from './QuestionnaireHead.module.scss';
import { SparkleTitle } from '@/shared/components/SparkleTitle/SparkleTitle';

type QuestionnaireHeadProps = { title: string; iconTitle: string };

export const QuestionnaireHead: React.FC<QuestionnaireHeadProps> = ({
  title,
  iconTitle,
}) => {
  return (
    <div className={styles.head}>
      <SparkleTitle title={iconTitle} />
      <h1 className={styles.title}>{title}</h1>
    </div>
  );
};
