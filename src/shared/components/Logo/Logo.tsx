import { images } from '@/assets/auth.images';
import styles from './Logo.module.scss';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';

export interface LogoProps {
  showWordmark?: boolean;
  direction?: 'horizontal' | 'vertical';
  titleMode?: 'center' | 'left';
  showLogo: boolean;
}

export function Logo({
  showWordmark = true,
  direction = 'vertical',
  titleMode = 'left',
  showLogo = true,
}: LogoProps) {
  return (
    <AnimatePresence>
      <motion.div
        layout
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        key="block"
        className={styles.logo}
        style={{ flexDirection: direction === 'horizontal' ? 'row' : 'column' }}
      >
        {showLogo && (
          <motion.div
            className={styles.imgContainer}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9 }}
            key="box"
          >
            <img src={images.logo} />
          </motion.div>
        )}

        {showWordmark && (
          <div
            className={clsx(styles.titleContainer, styles.titleMode)}
            style={{
              textAlign: titleMode === 'center' ? 'center' : 'left',
            }}
          >
            <span className={styles.title}>Dim Vyna</span>
            <span className={styles.subtitle}>Discover.Collect.Remember</span>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
