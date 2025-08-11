'use client';
import React from 'react';
import type { ReactNode } from 'react';
import ModalManager from '../Modal/ModalManager';
import type { MessagerProps } from '../Message/Messager';
import Messager from '../Message/Messager';

const App: React.FC<{
  children: ReactNode;
  messageConfig?: Omit<MessagerProps, 'children'>;
}> = ({ messageConfig, children }) => {
  return (
    <Messager {...messageConfig}>
      <ModalManager>{children}</ModalManager>
    </Messager>
  );
};

export default App;
