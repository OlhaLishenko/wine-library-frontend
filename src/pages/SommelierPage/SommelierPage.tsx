import { useAppSelector } from '@/store/hooks';
import { questions } from './questions';
import styles from './SommelierPage.module.scss';
import { Logo } from '@/shared/components/Logo/Logo';
import { SparkleIcon } from '@/features/poll-page/components/icons/Icons';
import { Questionnaire } from '@/features/poll-page/components/Questionnaire';
import { StepProgress } from '@/features/poll-page/components/StepProgress';

export function SommelierPage() {
  const step = useAppSelector((s) => s.sommelier.step);
  const total = questions.length;
  const isResult = step >= total;

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.topbar}>
          <div className={styles.topbarLogo}>
            <Logo showWordmark={false} />
            <span className={styles.topbarTitle}>Virtual Sommelier</span>
          </div>
          {!isResult && <StepProgress current={step} total={total} />}
        </div>

        <div className={styles.content}>
          <Questionnaire />
        </div>
      </main>
    </div>
  );
}
