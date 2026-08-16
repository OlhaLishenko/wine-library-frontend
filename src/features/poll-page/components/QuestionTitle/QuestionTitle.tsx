import React from 'react';
import styles from './QuestionTitle.module.scss';
import { SommelierQuestion } from '@/shared/types/SommelierQuestion';
import { Icons, IconsPoll } from '@/assets/icons';

type QuestionTitleProps = {
  question: SommelierQuestion;
};

export const QuestionTitle: React.FC<QuestionTitleProps> = ({ question }) => {
  const QuestionIcon = IconsPoll[question.iconName];

  return (
    <div className={styles.head}>
      <div className={styles.typeWrapper}>
        <div className={styles.questionType}>
          <span className={styles.typeTitle}>{question.eyebrow}</span>
          <Icons.ArrowRight className="icon icon--small" />
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.iconContainer}>
          <QuestionIcon className={styles.iconImage} />
        </div>
        <div className={styles.questionWrapper}>
          <h1 className={styles.title}>{question.title}</h1>
          {question.subtitle && (
            <p className={styles.subtitle}>{question.subtitle}</p>
          )}
        </div>
      </div>
    </div>
  );
};
