'use client';

import React from 'react';

interface Props<T> {
  initialState: T;
  externalValue?: T;
  onExternalChange?: (value: T) => void;
}

//open 传入即外部控制，不传入则内部控制
export function useControlOpen<T>({
  initialState,
  externalValue,
  onExternalChange,
}: Props<T>): [T, (value: T) => void] {
  const [state, setState] = React.useState<T>(initialState);

  React.useEffect(() => {
    if (externalValue !== undefined) {
      setState(externalValue);
    }
  }, [externalValue]);

  const setCombinedState = (value: T) => {
    setState(value);
    if (onExternalChange) {
      onExternalChange(value);
    }
  };
  return [state, setCombinedState];
}
