import React from 'react';
import styles from './RangeSlider.module.scss';

type RangeSliderProps = {
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
  color?: string;
  ariaLabel: string;
};

export const RangeSlider: React.FC<RangeSliderProps> = ({
  min,
  max,
  step = 1,
  value,
  onChange,
  color,
  ariaLabel,
}) => {
  const percent = ((value - min) / (max - min)) * 100;

  return (
    <div
      className={styles.sliderTrack}
      style={color ? ({ '--slider-color': color } as React.CSSProperties) : undefined}
    >
      <div className={styles.rail} />
      <div className={styles.railFill} style={{ width: `${percent}%` }} />
      <input
        type="range"
        className={styles.input}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={ariaLabel}
      />
    </div>
  );
};
