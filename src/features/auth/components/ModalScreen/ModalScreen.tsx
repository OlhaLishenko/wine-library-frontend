import { Icons } from '@/assets/icons';
import styles from './ModalScreen.module.scss';
import { Button } from '../../../../shared/components/Button/Button';
import { useContext } from 'react';
import { ModalScreenContext } from '../../hooks/modalScreen.context';
import classNames from 'classnames';
import { TITLE } from '@/shared/constants/context';
import { AlertContent } from '@/shared/components/Alerts/AlertContent';

type ModalScreenType = {
  message: string;
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
        <AlertContent message={message} />
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
