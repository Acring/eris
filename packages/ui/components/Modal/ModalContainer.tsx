'use client';
import React from 'react';
import type { ModalPropsWithId } from './useModal';
import { useModal } from './useModal';
import Modal from './Modal';

const ModalContainer = () => {
  const { modals } = useModal();
  return (
    <>
      {modals.map((modal: ModalPropsWithId) => (
        <Modal key={modal.modalManagerid} {...modal} />
      ))}
    </>
  );
};

ModalContainer.displayName = 'ModalContainer';

export default ModalContainer;
