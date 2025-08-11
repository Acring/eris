import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

export const cascaderVariant = cva(
  [
    'group/combobox min-w-[80px] flex w-[fit-content] cursor-pointer flex-nowrap items-center justify-between transition-all ',
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
