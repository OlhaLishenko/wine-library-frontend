import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  nextStep,
  setSingle,
  togglePairing,
} from '@/store/Poll/sommelierSlice';
import { questions } from '../../../../pages/SommelierPage/questions';
import styles from './Questionnaire.module.scss';
import { ChoiceCard } from '../ChoiceCard';
import { SommelierQuestion } from '@/shared/types/SommelierQuestion';
import { QuestionTitle } from '../QuestionTitle';
import { QuestionFooter } from '../QuestionFooter';
import { sommelierAnswersToParams } from '../../utility/mapSommelierAnswersToWineFilters';
import { loadWineList } from '@/store/Library/wineListSlice';

export function Questionnaire() {
  const dispatch = useAppDispatch();
  const { step, answers } = useAppSelector((s) => s.sommelier);

  const total = questions.length;
  const question: SommelierQuestion = questions[step];
  const isLastStep = step === total - 1;

  const singleValue =
    question.kind === 'single'
      ? answers[question.id as 'sweetness' | 'budget' | 'alcohol']
      : null;

  const canContinue = question.kind === 'single' ? Boolean(singleValue) : true;

  const handleNext = () => {
    if (isLastStep) {
      dispatch(loadWineList(sommelierAnswersToParams(answers)));
    }
    dispatch(nextStep());
  };

  return (
    <div className={styles.stage}>
      <QuestionTitle question={question} />

      <div className={styles.body}>
        {question.kind === 'single' && (
          <div className={styles.grid}>
            {question.options!.map((opt) => (
              <ChoiceCard
                key={opt.value}
                label={opt.label}
                icon={opt.icon}
                selected={singleValue === opt.filterValue}
                control="radio"
                onSelect={() =>
                  dispatch(
                    setSingle({
                      key: question.id as never,
                      value: opt.filterValue as never,
                    })
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
                icon={opt.icon}
                label={opt.label}
                selected={answers.food.includes(opt.filterValue)}
                control="checkbox"
                onSelect={() => dispatch(togglePairing(opt.filterValue))}
              />
            ))}
          </div>
        )}
      </div>

      <QuestionFooter
        step={step}
        total={total}
        canContinue={canContinue}
        onNext={handleNext}
      />
    </div>
  );
}
