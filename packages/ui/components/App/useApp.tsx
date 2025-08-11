'use client';
import { useModal } from '../Modal';
import { useMessage } from '../Message';

export const useApp = () => {
  const modal = useModal();
  const message = useMessage();
  return { modal, message };
};
