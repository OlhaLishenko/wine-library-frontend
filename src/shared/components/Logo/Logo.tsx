import { images } from '@/assets/auth.images';
import styles from './Logo.module.scss';
import clsx from 'clsx';

export interface LogoProps {
  showWordmark?: boolean;
  direction?: 'horizontal' | 'vertical';
  titleMode?: 'center' | 'left';
}

export function Logo({
  showWordmark = true,
  direction = 'vertical',
  titleMode = 'left',
}: LogoProps) {
  return (
    <div
      className={styles.logo}
      style={{ flexDirection: direction === 'horizontal' ? 'row' : 'column' }}
    >
      <div className={styles.imgContainer}>
        <img src={images.logo} />
      </div>
      {showWordmark && (
        <div
          className={clsx(styles.titleContainer, styles.titleMode)}
          style={{
            textAlign: titleMode === 'center' ? 'center' : 'left',
          }}
        >
          <span className={styles.title}>Dim Vyna (V-2)</span>
          <span className={styles.subtitle}>Discover.Collect.Remember</span>
        </div>
      )}
    </div>
  );
}
