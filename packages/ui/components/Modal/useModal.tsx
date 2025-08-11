'use client';
import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import type { ModalProps } from './type';
import { uuid } from '../../lib/utils';

export interface ModalPropsWithId extends ModalProps {
  modalManagerid: string; // 添加id属性
}

export interface ModalManager {
  modals: ModalPropsWithId[]; // 使用扩展后的类型
  open: (config: ModalProps) => {
    item: ModalPropsWithId;
    removeItem: () => void;
    updateItem: (updates: Partial<ModalPropsWithId>) => void;
  };
  close: (id: string) => void; // 关闭指定id的模态框
  closeAll: () => void;
  update: (id: string, updates: Partial<ModalPropsWithId>) => void;
}

const ModalsManagerContext = createContext<ModalManager | null>(null);

const defaultModalManager: ModalManager = {
  modals: [],
  open: (_: ModalProps) => {
    throw new Error('Modal.open requires a ModalsManagerProvider');
  },
  close: (_: string) => {
    throw new Error('Modal.close requires a ModalsManagerProvider');
  },
  closeAll: () => {
    throw new Error('Modal.closeAll requires a ModalsManagerProvider');
  },
  update: (_: string, __: Partial<ModalPropsWithId>) => {
    throw new Error('Modal.update requires a ModalsManagerProvider');
  },
};

export const useModal = (): ModalManager => {
  const context = useContext(ModalsManagerContext);
  return useMemo(() => context ?? defaultModalManager, [context]);
};

interface ModalsManagerProviderProps {
  children?: React.ReactNode;
}

// ModalsManagerProvider组件，用于提供ModalManager给上下文
export const ModalsManagerProvider: React.FC<ModalsManagerProviderProps> = ({ children }) => {
  const [modals, setModals] = useState<ModalPropsWithId[]>([]);

  const open = useCallback((config: ModalProps) => {
    const newModal: ModalPropsWithId = {
      open: true,
      __inContext: true, // 标记为在上下文中
      ...config,
      modalManagerid: uuid(), // 生成唯一的id
    };
    setModals((prevModals) => [...prevModals, newModal]);
    return {
      item: newModal,
      removeItem: () =>
        setModals((prevState) =>
          prevState.filter((e) => e.modalManagerid !== newModal.modalManagerid),
        ),
      updateItem: (updates: Partial<ModalPropsWithId>) =>
        setModals((prevModals) =>
          prevModals.map((modal) =>
            modal.modalManagerid === newModal.modalManagerid ? { ...modal, ...updates } : modal,
          ),
        ),
    };
  }, []);

  const close = useCallback((id?: string) => {
    setModals((prevModals) => prevModals.filter((modal) => modal.modalManagerid !== id));
  }, []);

  const closeAll = useCallback(() => {
    setModals([]);
  }, []);

  const update = useCallback((id: string, updates: Partial<ModalPropsWithId>) => {
    setModals((prevModals) =>
      prevModals.map((modal) => (modal.modalManagerid === id ? { ...modal, ...updates } : modal)),
    );
  }, []);

  const contextValue: ModalManager = {
    modals,
    open,
    close,
    closeAll,
    update,
  };
  return (
    <ModalsManagerContext.Provider value={contextValue}>{children}</ModalsManagerContext.Provider>
  );
};
