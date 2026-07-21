import { Icons } from '@/assets/icons';
import styles from './ModalScreen.module.scss';
import { Button } from '../Button/Button';
import { useContext } from 'react';
import { ModalScreenContext } from '../../hooks/modalScreen.context';
import classNames from 'classnames';

type ModalScreenType = {
  message: string | null;
  onResent?: () => void;
};

export function ModalScreen({ message, onResent }: ModalScreenType) {
  const { openModal, setOpenModal } = useContext(ModalScreenContext);

  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <div
      className={classNames(styles.modal, {
        [styles.open]: openModal,
      })}
    >
      <div className={styles.modal__container}>
        <button className={styles.modal__closeBtn} onClick={handleClose}>
          <Icons.Close />
        </button>
        <Icons.ErrorAlert />
        <div className={styles.textContent}>
          <h1 className={styles.textContent__title}>Something went wrong</h1>
          <h2 className={styles.textContent__subtitle}>{message}</h2>
        </div>
        <div className={styles.modal__btns}>
          <Button onClick={onResent} fullWidth>
            Try Again
          </Button>
          <Button onClick={handleClose} fullWidth variant={'ghost'}>
            Dismiss
          </Button>
        </div>
      </div>
    </div>
  );
}
