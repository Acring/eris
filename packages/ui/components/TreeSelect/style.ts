import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

export const treeSelectVariant = cva(
  [
    'group/combobox min-w-[80px] flex w-[fit-content] cursor-pointer flex-nowrap items-center justify-between transition-all max-h-[100px]',
    'border-form-border-default-normal text-body text-text-1 rounded border  border-solid bg-form-bg-normal',
    'placeholder:text-text-4',
  ],
  {
    variants: {
      error: {
        true: cn('border-form-border-danger-hover aria-expanded:shadow-interactive-danger-active'),
        false: cn(
          'component-ring-primary component-border-primary ',
          'aria-expanded:border-form-border-default-hover aria-expanded:shadow-interactive-primary-active focus:outline-none',
        ),
      },

      disabled: {
        true: 'bg-form-bg-disable text-text-4 pointer-events-none',
        false: '',
      },
      noBorder: {
        true: cn(
          'bg-transparent border-transparent hover:border-transparent disabled:bg-transparent  ',
          'aria-expanded:border-transparent aria-expanded:shadow-none',
          'focus:shadow-none active:shadow-none active:border-transparent',
        ),
        false: '',
      },
    },
  },
);

export const paddingVariant = cva(['flex items-center gap-[4px]'], {
  variants: {
    size: {
      sm: cn('px-1 py-[2px]'),
      md: cn('px-1 py-[6px]'),
      lg: cn('px-1 py-[10px]'),
    },
  },
});
