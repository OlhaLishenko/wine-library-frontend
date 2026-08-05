import React from 'react';
import styles from './SectionText.module.scss';

type SectionTextProps = {
  text: string;
};

export const SectionText: React.FC<SectionTextProps> = ({ text }) => {
  return <p className={styles.sectionText}>{text}</p>;
};
