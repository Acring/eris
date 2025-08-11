import { createContext } from 'react';
import type { MessageContextType } from './Messager';

export const MessageContext = createContext<MessageContextType | undefined>(undefined);
