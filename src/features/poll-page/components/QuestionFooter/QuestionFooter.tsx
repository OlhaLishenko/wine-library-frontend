import React from 'react';
import styles from './QuestionFooter.module.scss';
import { Icons } from '@/assets/icons';
import { Button } from '@/shared/components/Button/Button';
import { prevStep } from '@/store/Poll/sommelierSlice';
import { useAppDispatch } from '@/store/hooks';

type QuestionFooterProps = {
  total: number;
  step: number;
  canContinue: boolean;
  onNext: () => void;
};

export const QuestionFooter: React.FC<QuestionFooterProps> = ({
  total,
  step,
  canContinue,
  onNext,
}) => {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.footer}>
      <Button
        variant="ghost"
        onClick={() => dispatch(prevStep())}
        disabled={step === 0}
      >
        <Icons.ArrowLeft /> Back
      </Button>
      <Button variant="primary" onClick={onNext} disabled={!canContinue}>
        {step === total - 1 ? 'See my match' : 'Continue'} <Icons.ArrowRight />
      </Button>
    </div>
  );
};
