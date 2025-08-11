import { createContext } from 'react';

import type { TreeContextProps } from './type';

const defaultContextValue: TreeContextProps = {};

export const TreeContext = createContext<TreeContextProps>(defaultContextValue);
