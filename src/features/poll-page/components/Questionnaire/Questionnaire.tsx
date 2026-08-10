import { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  nextStep,
  prevStep,
  setSingle,
  togglePairing,
  setAbv,
} from '@/store/Poll/sommelierSlice';
import {
  ChoiceOption,
  questions,
} from '../../../../pages/SommelierPage/questions';
import { SommelierResult } from './SommelierResult';
import styles from './Questionnaire.module.scss';
import { ChoiceCard } from '../ChoiceCard';
import { AbvRangeFilter } from '../AbvRangeFilter';
import { Button } from '@/features/auth/components/Button/Button';
import { Icons, IconsPoll } from '@/assets/icons';

const iconFor: Record<NonNullable<ChoiceOption['icon']>, React.ReactNode> = {
  // anyOption: <IconsPoll.AnyOption />,
  // ArrowLeft: <IconsPoll.ArrowLeft />,
  // ArrowRight: <IconsPoll.ArrowRight />,
  dry: <IconsPoll.BoneDry />,
  // Celebration: <IconsPoll.Celebration />,
  // Check: <IconsPoll.Check />,
  cheese: <IconsPoll.Cheese />,
  dessert: <IconsPoll.Dessert />,
  // Dinner: <IconsPoll.Dinner />,
  // Everyday: <IconsPoll.Everyday />,
  fishSeafood: <IconsPoll.FishSeafood />,
  // Full: <IconsPoll.Full />,
  // Gift: <IconsPoll.Gift />,
  justWine: <IconsPoll.JustWine />,
  Light: <IconsPoll.Light />,
  Medium: <IconsPoll.Medium />,
  NoPreference: <IconsPoll.NoPreference />,
  offDry: <IconsPoll.OffDry />,
  // Poultry: <IconsPoll.Poultry />,
  meat: <IconsPoll.RedMeat />,
  // Red: <IconsPoll.Red />,
  Restart: <IconsPoll.Restart />,
  // Rose: <IconsPoll.Rose />,
  // Sparkle: <IconsPoll.Sparkle />,
  // Sparkling: <IconsPoll.Sparkling />,
  // Spicy: <IconsPoll.Spicy />,
  // Sweet: <IconsPoll.Sweet />,
  // White: <IconsPoll.White />,
};

/** Drives the guided flow: renders one question at a time from the store. */
export function Questionnaire() {
  const dispatch = useAppDispatch();
  const { step, answers } = useAppSelector((s) => s.sommelier);

  const total = questions.length;
  const isResult = step >= total;
  const question = questions[step];

  const singleValue =
    question && question.kind === 'single'
      ? (answers[
          question.id as 'wineType' | 'sweetness' | 'body' | 'occasion'
        ] as string | null)
      : null;

  const canContinue = useMemo(() => {
    if (isResult) return true;
    if (question.kind === 'single') return Boolean(singleValue);
    return true; // multi & abv are always valid (none is a legitimate answer)
  }, [isResult, question, singleValue]);

  if (isResult) {
    return <SommelierResult />;
  }

  return (
    <div className={styles.stage}>
      <header className={styles.head}>
        <span className={styles.eyebrow}>{question.eyebrow}</span>
        <h1 className={styles.title}>{question.title}</h1>
        {question.subtitle && (
          <p className={styles.subtitle}>{question.subtitle}</p>
        )}
      </header>

      <div className={styles.body}>
        {question.kind === 'single' && (
          <div className={styles.grid}>
            {question.options!.map((opt) => (
              <ChoiceCard
                key={opt.value}
                label={opt.label}
                hint={opt.hint}
                icon={opt.icon ? iconFor[opt.icon] : undefined}
                selected={singleValue === opt.value}
                control="radio"
                onSelect={() =>
                  dispatch(
                    setSingle({ key: question.id as never, value: opt.value })
                  )
                }
              />
            ))}
          </div>
        )}

        {question.kind === 'multi' && (
          <div className={styles.grid}>
            {question.options!.map((opt) => (
              <ChoiceCard
                key={opt.value}
                label={opt.label}
                hint={opt.hint}
                selected={answers.pairings.includes(opt.value)}
                control="checkbox"
                onSelect={() => dispatch(togglePairing(opt.value))}
              />
            ))}
          </div>
        )}

        {question.kind === 'abv' && (
          <div className={styles.abv}>
            <AbvRangeFilter
              value={answers.abv}
              onChange={(next) => dispatch(setAbv(next))}
              label="Alcohol by volume"
            />
          </div>
        )}
      </div>

      <footer className={styles.footer}>
        <Button
          variant="ghost"
          onClick={() => dispatch(prevStep())}
          disabled={step === 0}
        >
          <Icons.ArrowLeft /> Back
        </Button>
        <Button
          variant="primary"
          onClick={() => dispatch(nextStep())}
          disabled={!canContinue}
        >
          {step === total - 1 ? 'See my match' : 'Continue'}{' '}
          <Icons.ArrowRight />
        </Button>
      </footer>
    </div>
  );
}
