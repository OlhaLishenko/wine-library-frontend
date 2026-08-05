import React from 'react';
import styles from './SeparatorLine.module.scss';

type SeparatorLineProps = {
  margin?: string;
};

export const SeparatorLine: React.FC<SeparatorLineProps> = ({
  margin = 'margin: 0px',
}) => {
  return <div className={styles.separator} style={{ margin }}></div>;
};
