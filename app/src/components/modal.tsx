import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";

type ModalProps = {
  isOpen: boolean;
  toggle: () => void;
  children: React.ReactNode;
};

function Modal({ isOpen, toggle, children }: ModalProps) {
  return (
    <Dialog open={isOpen} onClose={toggle} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 flex w-screen justify-center items-start mt-15 p-4">
        <DialogPanel className="max-w-2xl min-w-[80%] sm:min-w-lg space-y-3 border bg-white rounded-md p-2">
          {children}
        </DialogPanel>
      </div>
    </Dialog>
  );
}

export { Modal };
