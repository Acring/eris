import * as React from 'react';
import { forwardRef } from 'react';
import type { Command as CommandPrimitive } from '@acring/cmdk';
import { useCommandState } from '@acring/cmdk';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';
import { Empty } from '../Empty';

/**
 * The `CommandEmpty` of shadcn/ui will cause the cmdk empty not rendering correctly.
 * So we create one and copy the `Empty` implementation from `cmdk`.
 *
 * @reference: https://github.com/hsuanyi-chou/shadcn-ui-expansions/issues/34#issuecomment-1949561607
 **/
const CommandEmpty = forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof CommandPrimitive.Empty>
>(({ className, ...props }, forwardedRef) => {
  const render = useCommandState((state) => state.filtered.count === 0);
  const searchValue = useCommandState((state) => state.search);

  const { t } = useTranslation();
  if (!render) return null;
  if (!props.children)
    return (
      <div
        className={cn('h-fit flex items-center justify-center', className)}
        // eslint-disable-next-line react/no-unknown-property
        cmdk-empty=""
        ref={forwardedRef}
        role="presentation"
        {...props}
      >
        <Empty description={searchValue ? t('暂无搜索结果，请重新输入') : t('暂无选项')} />
      </div>
    );
  return (
    // eslint-disable-next-line react/no-unknown-property
    <div cmdk-empty="" ref={forwardedRef} role="presentation">
      {props.children}
    </div>
  );
});

CommandEmpty.displayName = 'CommandEmpty';

export default CommandEmpty;
