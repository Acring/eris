import * as React from 'react';
import { useEffect } from 'react';

export function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

export function useClickOutside(
  dropdownRef: React.RefObject<HTMLDivElement>,
  triggerRef: React.RefObject<HTMLDivElement>,
  isOpen: boolean,
  onClose: () => void,
) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        onClose();
        triggerRef.current?.blur();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchend', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchend', handleClickOutside);
    };
  }, [isOpen, onClose, dropdownRef, triggerRef]);
}

export function useInputWidth(inputRef: React.RefObject<HTMLInputElement>, inputValue: string) {
  React.useLayoutEffect(() => {
    const input = inputRef.current;
    if (!input) return;

    const measureSpan = document.createElement('span');
    measureSpan.style.visibility = 'hidden';
    measureSpan.style.position = 'absolute';
    measureSpan.style.whiteSpace = 'pre';
    const computedStyle = window.getComputedStyle(input);
    measureSpan.style.font = computedStyle.font;

    measureSpan.textContent = inputValue || '';
    document.body.appendChild(measureSpan);

    const width = inputValue ? `${Math.max(20, measureSpan.offsetWidth + 8)}px` : '2px';
    input.style.width = width;

    document.body.removeChild(measureSpan);
  }, [inputValue, inputRef]);
}
