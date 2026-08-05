import { Icons } from '@/assets/icons';
import styles from './ModalScreen.module.scss';
import { Button } from '../Button/Button';
import { useContext } from 'react';
import { ModalScreenContext } from '../../hooks/modalScreen.context';
import classNames from 'classnames';
import { TITLE } from '@/shared/constants/context';

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
      <div className={styles.modalContainer}>
        <button className={styles.modalCloseBtn} onClick={handleClose}>
          <Icons.Close />
        </button>
        <Icons.ErrorAlert />
        <div className={styles.textContent}>
          <h1 className={styles.textContentTitle}>{TITLE.modal.title}</h1>
          <h2 className={styles.textContentSubtitle}>{message}</h2>
        </div>
        <div className={styles.modalBtns}>
          <Button onClick={onResent} fullWidth>
            {TITLE.modal.btnOk}
          </Button>
          <Button onClick={handleClose} fullWidth variant={'ghost'}>
            {TITLE.modal.btnCancel}
          </Button>
        </div>
      </div>
    </div>
  );
}
