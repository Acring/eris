'use client';
import React from 'react';
import { ModalsManagerProvider } from './useModal';
import ModalContainer from './ModalContainer';

const ModalManager: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  return (
    <ModalsManagerProvider>
      <ModalContainer />
      {children}
    </ModalsManagerProvider>
  );
};

export default ModalManager;
