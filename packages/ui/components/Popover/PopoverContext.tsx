import type { ReactNode, Dispatch, SetStateAction } from 'react';
import React, { createContext, useContext, useState } from 'react';

interface PopoverContextType {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const PopoverContext = createContext<PopoverContextType | undefined>(undefined);

export const PopoverProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);
  return <PopoverContext.Provider value={{ open, setOpen }}>{children}</PopoverContext.Provider>;
};

export const usePopover = (): PopoverContextType => {
  const context = useContext(PopoverContext);
  if (!context) {
    throw new Error('usePopover must be used within a PopoverProvider');
  }
  return context;
};
