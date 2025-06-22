import { Dialog } from "@base-ui-components/react/dialog";
import styles from "./index.module.css";

type ModalProps = {
  isOpen: boolean;
  toggle: () => void;
  children: React.ReactNode;
};

// https://base-ui.com/react/components/dialog
const Modal = ({ isOpen, toggle, children }: ModalProps) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={toggle}>
      <Dialog.Portal>
        <Dialog.Backdrop className={styles.Backdrop} />
        <Dialog.Popup className={styles.Popup}>{children}</Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export { Modal };
