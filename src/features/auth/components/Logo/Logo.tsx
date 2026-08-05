import styles from './Logo.module.scss';

export interface LogoProps {
  showWordmark?: boolean;
}

export function Logo({ showWordmark = true }: LogoProps) {
  return (
    <div className={styles.logo}>
      <span className={styles.mark} aria-hidden="true">
        WL
      </span>
      {showWordmark && <span className={styles.wordmark}>Wine Library</span>}
    </div>
  );
}
