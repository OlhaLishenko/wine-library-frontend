import { useAppSelector } from '@/store/hooks';
import { questions } from './questions';
import styles from './SommelierPage.module.scss';
import { StepProgress } from '@/features/poll-page/components/StepProgress';
import { Questionnaire } from '@/features/poll-page/components/Questionnaire';
import { ResultScreen } from '@/features/poll-page/components/ResultScreen';
import { TopNav } from '@/shared/components/TopNav';

export function SommelierPage() {
  const step = useAppSelector((s) => s.sommelier.step);
  const total = questions.length;
  const isResult = step >= total;

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <TopNav />
        <div className={styles.topbar}>
          {!isResult && <StepProgress current={step} total={total} />}
        </div>

        <div className={styles.content}>
          {isResult ? <ResultScreen /> : <Questionnaire />}
        </div>
      </main>
    </div>
  );
}
