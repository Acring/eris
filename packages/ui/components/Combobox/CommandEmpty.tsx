import * as React from 'react';
import { forwardRef } from 'react';
import type { Command as CommandPrimitive } from '@acring/cmdk';
import { useCommandState } from '@acring/cmdk';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';
import SearchEmptySvg from '../../assets/search_empty_sm.svg?url';
import EmptySvg from '../../assets/empty_sm.svg?url';
import { Empty } from '../Empty';
import { ThemedImage } from '../ThemedImage';

/**
 * The `CommandEmpty` of shadcn/ui will cause the cmdk empty not rendering correctly.
 * So we create one and copy the `Empty` implementation from `cmdk`.
 *
 * @reference: https://github.com/hsuanyi-chou/shadcn-ui-expansions/issues/34#issuecomment-1949561607
 **/
const CommandEmpty = forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof CommandPrimitive.Empty> & {
    emptyText?: string;
  }
>(({ className, ...props }, forwardedRef) => {
  const { emptyText } = props;
  const render = useCommandState((state) => state.filtered.count === 0);
  const searchValue = useCommandState((state) => state.search);
  const searchEmptySvgUrl =
    typeof SearchEmptySvg === 'string' ? SearchEmptySvg : SearchEmptySvg.src;
  const emptySvgUrl = typeof EmptySvg === 'string' ? EmptySvg : EmptySvg.src;

  const { t } = useTranslation();
  if (!render) return null;
  if (!props.children)
    return (
      <div
        className={cn('h-fit flex items-center justify-center h-[160px]', className)}
        // eslint-disable-next-line react/no-unknown-property
        cmdk-empty=""
        ref={forwardedRef}
        role="presentation"
        {...props}
      >
        <Empty
          description={searchValue ? t('搜索结果为空') : emptyText || t('暂无选项')}
          image={
            <ThemedImage
              alt="empty"
              height={80}
              src={searchValue ? searchEmptySvgUrl : emptySvgUrl}
              width={80}
            />
          }
        />
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
