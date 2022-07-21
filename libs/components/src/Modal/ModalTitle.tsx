import { Dialog } from '@headlessui/react';

export const ModalTitle: React.FCChildren = ({ children }) => {
  return <Dialog.Title>{children}</Dialog.Title>;
};
