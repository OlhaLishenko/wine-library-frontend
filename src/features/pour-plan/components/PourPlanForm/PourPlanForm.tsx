import React, { useState } from 'react';
import styles from './PourPlanForm.module.scss';
import clsx from 'clsx';
import { RangeSlider } from '@/shared/components/RangeSlider/RangeSlider';
import { PourPlanSection } from '../PourPlanSection/PourPlanSection';
import { PourPlanOccasionChip } from '../PourPlanOccasionChip/PourPlanOccasionChip';
import { PourPlanPaceCard } from '../PourPlanPaceCard/PourPlanPaceCard';
import { PourPlanResults } from '../PourPlanResults/PourPlanResults';
import { PourPlanLibrarySection } from '../PourPlanLibrarySection/PourPlanLibrarySection';
import { WINE_TYPE_COLORS } from '@/shared/constants/wineTypeColors';

const OCCASIONS = [
  'Dinner',
  'Birthday',
  'Wedding',
  'Party',
  'Corporate Event',
  'Casual Gathering',
  'Tasting',
  'Other',
];

const PACE_OPTIONS = [
  {
    key: 'light',
    title: 'Light',
    description: 'A glass or two, conversation first.',
  },
  {
    key: 'moderate',
    title: 'Moderate',
    description: 'Steady pours through the evening.',
  },
  {
    key: 'generous',
    title: 'Generous',
    description: 'Glasses rarely stay empty.',
  },
];

const MIX_SLIDERS = [
  { key: 'red', label: 'Red', color: WINE_TYPE_COLORS.red },
  { key: 'white', label: 'White', color: WINE_TYPE_COLORS.white },
  { key: 'rose', label: 'Rosé', color: WINE_TYPE_COLORS.rose },
  { key: 'sparkling', label: 'Sparkling', color: WINE_TYPE_COLORS.sparkling },
] as const;

type MixKey = (typeof MIX_SLIDERS)[number]['key'];

const DEFAULT_MIX: Record<MixKey, number> = {
  red: 45,
  white: 35,
  rose: 5,
  sparkling: 15,
};

export const PourPlanForm: React.FC = () => {
  const [guests, setGuests] = useState(12);
  const [occasion, setOccasion] = useState('Dinner');
  const [duration, setDuration] = useState(4);
  const [role, setRole] = useState<'main' | 'several'>('main');
  const [pace, setPace] = useState('moderate');
  const [mix, setMix] = useState<Record<MixKey, number>>(DEFAULT_MIX);

  const updateMix = (key: MixKey, value: number) => {
    setMix((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className={styles.form}>
      <div className={styles.head}>
        <span className={styles.eyebrow}>Plan Your Pour</span>
        <h1 className={styles.title}>Tell us a little about your event.</h1>
        <p className={styles.subtitle}>
          Everything updates as you go. Better to have a little extra than an
          empty bottle.
        </p>
      </div>

      <PourPlanSection index={1} title="Who's coming">
        <div className={styles.stepperRow}>
          <button
            type="button"
            className={styles.stepperBtn}
            aria-label="Fewer guests"
            onClick={() => setGuests((g) => Math.max(1, g - 1))}
          >
            −
          </button>
          <div className={styles.stepperValue}>
            <span className={styles.stepperNumber}>{guests}</span>
            <span className={styles.stepperLabel}>Guests</span>
          </div>
          <button
            type="button"
            className={styles.stepperBtn}
            aria-label="More guests"
            onClick={() => setGuests((g) => Math.min(200, g + 1))}
          >
            +
          </button>
        </div>
        <RangeSlider
          min={1}
          max={100}
          value={guests}
          onChange={setGuests}
          ariaLabel="Number of guests"
        />
      </PourPlanSection>

      <PourPlanSection index={2} title="The occasion">
        <div className={styles.chips}>
          {OCCASIONS.map((label) => (
            <PourPlanOccasionChip
              key={label}
              label={label}
              selected={occasion === label}
              onSelect={() => setOccasion(label)}
            />
          ))}
        </div>

        <div className={styles.durationRow}>
          <div className={styles.durationLabelRow}>
            <span className={styles.durationLabel}>How long</span>
            <span className={styles.durationValue}>{duration} hours</span>
          </div>
          <RangeSlider
            min={1}
            max={12}
            value={duration}
            onChange={setDuration}
            ariaLabel="Event duration in hours"
          />
        </div>
      </PourPlanSection>

      <PourPlanSection index={3} title="How it'll be poured">
        <div className={styles.subsection}>
          <span className={styles.subsectionLabel}>Wine's role at the table</span>
          <div className={styles.roleToggle}>
            <button
              type="button"
              className={clsx(styles.roleBtn, role === 'main' && styles.roleBtnActive)}
              aria-pressed={role === 'main'}
              onClick={() => setRole('main')}
            >
              The main drink
            </button>
            <button
              type="button"
              className={clsx(
                styles.roleBtn,
                role === 'several' && styles.roleBtnActive
              )}
              aria-pressed={role === 'several'}
              onClick={() => setRole('several')}
            >
              One of several
            </button>
          </div>
        </div>

        <div className={styles.subsection}>
          <span className={styles.subsectionLabel}>Drinking pace</span>
          <div className={styles.paceList}>
            {PACE_OPTIONS.map((option) => (
              <PourPlanPaceCard
                key={option.key}
                title={option.title}
                description={option.description}
                selected={pace === option.key}
                onSelect={() => setPace(option.key)}
              />
            ))}
          </div>
        </div>
      </PourPlanSection>

      <PourPlanSection index={4} title="The mix">
        <p className={styles.mixHint}>
          Adjust the split, or let us suggest one for a dinner.
        </p>
        <button
          type="button"
          className={styles.suggestBtn}
          onClick={() => setMix(DEFAULT_MIX)}
        >
          Suggest for me
        </button>

        <div className={styles.mixList}>
          {MIX_SLIDERS.map(({ key, label, color }) => (
            <div className={styles.mixRow} key={key}>
              <div className={styles.mixLabelRow}>
                <span className={styles.mixLabel}>
                  <span
                    className={styles.mixDot}
                    style={{ backgroundColor: color }}
                  />
                  {label}
                </span>
                <span className={styles.mixValue}>{mix[key]}%</span>
              </div>
              <RangeSlider
                min={0}
                max={100}
                value={mix[key]}
                onChange={(value) => updateMix(key, value)}
                color={color}
                ariaLabel={`${label} share`}
              />
            </div>
          ))}
        </div>
      </PourPlanSection>

      <PourPlanResults guests={guests} duration={duration} />

      <PourPlanLibrarySection guests={guests} />
    </div>
  );
};
