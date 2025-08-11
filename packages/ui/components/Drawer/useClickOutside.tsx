'use client';

import type { RefObject } from 'react';
import { useEffect } from 'react';

type ClickOutsideCallback = (event: MouseEvent) => void;

const useClickOutside = (ref: RefObject<HTMLElement>, callback: ClickOutsideCallback): void => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback(event);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);
};

export default useClickOutside;
