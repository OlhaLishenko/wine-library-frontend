import React from 'react';
import styles from './QuestionnaireWelcomeScreen.module.scss';
import { QuestionnaireHead } from '../QuestionnaireHead';
import { TITLE } from '@/shared/constants/context';
import { Button } from '@/shared/components/Button/Button';
import { BtnTitle } from '@/shared/components/BtnTitle';

type QuestionnaireWelcomeScreenProps = {
  onStart: () => void;
};

export const QuestionnaireWelcomeScreen: React.FC<
  QuestionnaireWelcomeScreenProps
> = ({ onStart }) => {
  return (
    <div className={styles.container}>
      <QuestionnaireHead
        iconTitle="Guided questionnaire"
        title="Find the right wine for you"
      />
      <span className={styles.subtitle}>{TITLE.sommelier.welcomeSubtitle}</span>

      <div className={styles.startButton}>
        <Button fullWidth={false} onClick={onStart}>
          <BtnTitle>{`Start Questionnaire >`}</BtnTitle>
        </Button>
      </div>
    </div>
  );
};
