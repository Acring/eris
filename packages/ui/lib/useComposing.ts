import React from 'react';
import { useRef } from 'react';

const useComposing = (props: {
  onCompositionStart: (e: React.CompositionEvent<any>) => void;
  onCompositionEnd: (e: React.CompositionEvent<any>) => void;
}) => {
  const { onCompositionStart, onCompositionEnd } = props;

  const isComposing = useRef<boolean>(false);
  const handleComposition = React.useCallback(
    (e: React.CompositionEvent<any>) => {
      if (e.type === 'compositionend') {
        isComposing.current = false;
        onCompositionEnd?.(e);
      } else {
        isComposing.current = true;
        onCompositionStart?.(e);
      }
    },
    [onCompositionEnd, onCompositionStart],
  );
  return {
    isComposing,
    onCompositionEnd: handleComposition,
    onCompositionStart: handleComposition,
  };
};

export default useComposing;
