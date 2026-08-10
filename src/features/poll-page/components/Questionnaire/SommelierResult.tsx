import { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
// import { goToStep, resetSommelier } from '@/store/sommelierSlice';
// import { Button } from '@/components/Button/Button';
// import { SparkleIcon, RestartIcon } from '@/components/icons/Icons';
// import { matchWine } from '../matchWine';
import styles from './SommelierResult.module.scss';
import { matchWine } from '@/pages/SommelierPage/matchWine';
import { RestartIcon, SparkleIcon } from '../icons/Icons';
import { Button } from '@/features/auth/components/Button/Button';
import { resetSommelier } from '@/store/Poll/sommelierSlice';

/** Final screen: the recommended bottle plus a recap of the answers. */
export function SommelierResult() {
  const dispatch = useAppDispatch();
  const answers = useAppSelector((s) => s.sommelier.answers);
  const { wine, score } = useMemo(() => matchWine(answers), [answers]);

  const summary = [
    {
      label: 'Style',
      value: answers.wineType === 'Any' ? 'Open' : answers.wineType,
    },
    {
      label: 'Sweetness',
      value: answers.sweetness === 'Any' ? 'Any' : answers.sweetness,
    },
    { label: 'Body', value: answers.body },
    { label: 'Occasion', value: answers.occasion },
    {
      label: 'ABV',
      value: `${answers.abv.min}–${answers.abv.max}%`,
    },
  ].filter((s) => s.value);

  return (
    <div className={styles.result}>
      <header className={styles.head}>
        <span className={styles.badge}>
          <SparkleIcon /> Your match · {score}% fit
        </span>
        <h1 className={styles.title}>We’d pour you the {wine.name}.</h1>
        <p className={styles.lede}>
          Based on your answers, this {wine.body.toLowerCase()}-bodied{' '}
          {wine.type.toLowerCase()} is the closest fit in the cellar right now.
        </p>
      </header>

      <article className={styles.card}>
        <div className={styles.bottle} aria-hidden="true">
          <span className={styles.bottleType}>{wine.type}</span>
        </div>
        <div className={styles.info}>
          <h2 className={styles.wineName}>{wine.name}</h2>
          <p className={styles.origin}>
            {wine.winery} · {wine.region}, {wine.country} · {wine.vintage}
          </p>
          <p className={styles.note}>{wine.note}</p>
          <dl className={styles.specs}>
            <div>
              <dt>Grape</dt>
              <dd>{wine.grape}</dd>
            </div>
            <div>
              <dt>Sweetness</dt>
              <dd>{wine.sweetness}</dd>
            </div>
            <div>
              <dt>Body</dt>
              <dd>{wine.body}</dd>
            </div>
            <div>
              <dt>ABV</dt>
              <dd>{wine.alcohol}%</dd>
            </div>
          </dl>
        </div>
      </article>

      <section className={styles.recap} aria-label="Your preferences">
        {summary.map((s) => (
          <span key={s.label} className={styles.chip}>
            <span className={styles.chipLabel}>{s.label}</span>
            <span className={styles.chipValue}>{s.value}</span>
          </span>
        ))}
        {answers.pairings.length > 0 && (
          <span className={styles.chip}>
            <span className={styles.chipLabel}>Pairing</span>
            <span className={styles.chipValue}>
              {answers.pairings.join(', ')}
            </span>
          </span>
        )}
      </section>

      <footer className={styles.actions}>
        <Button variant="primary">Add to my library</Button>
        <Button variant="ghost" onClick={() => dispatch(goToStep(0))}>
          Adjust answers
        </Button>
        <button
          type="button"
          className={styles.restart}
          onClick={() => dispatch(resetSommelier())}
        >
          <RestartIcon /> Start over
        </button>
      </footer>
    </div>
  );
}
