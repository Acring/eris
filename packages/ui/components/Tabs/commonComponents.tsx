import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

export const tabListContainerVariants = cva(cn('flex items-center'), {
  variants: {
    direction: {
      right: cn('justify-end'),
    },
  },
});

export const tabListVariants = cva(cn('flex items-center relative'), {
  variants: {
    scrollable: {
      true: cn('no-scrollbar overflow-x-scroll scroll-smooth'),
    },
  },
});

export const arrowVariants = cva(cn('hidden cursor-pointer'), {
  variants: {
    showLeftArrow: {
      true: cn('flex'),
    },
    showRightArrow: {
      true: cn('flex'),
    },
    left: {
      true: cn('mr-[4px]'),
    },
    right: {
      true: cn('ml-[4px]'),
    },
    size: {
      small: cn('p-[2px]'),
      large: cn('p-[7px]'),
    },
  },
});
