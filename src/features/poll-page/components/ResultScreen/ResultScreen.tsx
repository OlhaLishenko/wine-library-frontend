import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { goToStep, resetSommelier } from '@/store/Poll/sommelierSlice';
import { Button } from '@/shared/components/Button/Button';
import { RestartIcon } from '../../../../shared/components/icons/Icons';
import styles from './ResultScreen.module.scss';
import { ResultList } from '@/features/poll-page/components/ResultList';
import { QuestionnaireHead } from '../QuestionnaireHead';

export function ResultScreen() {
  const dispatch = useAppDispatch();
  const answers = useAppSelector((s) => s.sommelier.answers);

  const handleRestart = () => {
    dispatch(resetSommelier());
  };

  return (
    <div className={styles.result}>
      <QuestionnaireHead
        iconTitle="Your preferences"
        title="Here’s what we picked up."
      />

      <section className={styles.recap} aria-label="Your preferences">
        {answers.sweetness.length > 0 && (
          <span className={styles.chip}>
            <span className={styles.chipLabel}>Sweetness</span>
            <span className={styles.chipValue}>
              {answers.sweetness[0].name}
            </span>
          </span>
        )}
        <span className={styles.chip}>
          <span className={styles.chipLabel}>Budget</span>
          <span className={styles.chipValue}>
            ${answers.budget.minPrice}–${answers.budget.maxPrice}
          </span>
        </span>
        <span className={styles.chip}>
          <span className={styles.chipLabel}>Alcohol</span>
          <span className={styles.chipValue}>
            {answers.alcohol.minAlcohol}–{answers.alcohol.maxAlcohol}%
          </span>
        </span>
        {answers.food.length > 0 && (
          <span className={styles.chip}>
            <span className={styles.chipLabel}>Food</span>
            <span className={styles.chipValue}>{answers.food.join(', ')}</span>
          </span>
        )}
      </section>

      <footer className={styles.actions}>
        <Button variant="ghost" onClick={() => dispatch(goToStep(0))}>
          Adjust answers
        </Button>
        <button
          type="button"
          className={styles.restart}
          onClick={handleRestart}
        >
          <RestartIcon /> Start over
        </button>
      </footer>

      <ResultList restartPoll={handleRestart} />
    </div>
  );
}
