import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FilterFill16 } from '@xsky/eris-icons';
import lodash from 'lodash';
import type * as Select from '@radix-ui/react-select';
import t from '../../i18n';
import EmptySvg from '../../assets/empty_sm.svg?url';
import { Popover, PopoverContent, PopoverTrigger, PopoverPortal } from '@radix-ui/react-popover';
import { cn } from '../../lib/utils';
import { ThemedImage } from '../ThemedImage';
import { Command, CommandList, CommandEmpty, CommandGroup, CommandItem } from '../Command';
import IconButton from '../IconButton/IconButton';
import { Checkbox } from '../Checkbox';
import ScrollArea from '../ScrollArea/ScrollArea';
import Button from '../Button/Button';
import { Empty } from '../Empty';
import type { FieldFilterItem } from './type';

const ItemsMaxHeight = 264;

export default function TableFilter({
  filters,
  filterValue,
  filterType = 'single',
  onChange,
}: {
  filters: FieldFilterItem[];
  filterValue: any;
  filterType: 'multiple' | 'single';
  onChange: (value: any) => void;
  onClose?: () => void;
} & React.ComponentProps<typeof Select.Trigger>) {
  const initialValue = useMemo(() => (filterType === 'single' ? undefined : []), [filterType]);
  const [open, setOpen] = useState(false);

  const [oldChecked, setOldChecked] = useState<string | string[] | undefined>(() =>
    filterType === 'single' ? undefined : [],
  );
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  const [checked, setChecked] = useState<any | any[] | undefined>(() =>
    filterType === 'single' ? undefined : [],
  );

  const active = useMemo(() => {
    return filterType === 'single' ? !lodash.isNil(checked) : Boolean(checked?.length);
  }, [checked, filterType]);

  useEffect(() => {
    const newValue = !lodash.isNil(filterValue)
      ? filterValue
      : filterType === 'single'
        ? undefined
        : [];
    setOldChecked(newValue);
    setChecked(newValue);
  }, [filters, filterValue, filterType]);

  const handleClick = useCallback(
    (filterValueItem: string) => {
      if (filterType === 'single') {
        if (checked === filterValueItem) {
          setChecked(undefined);
        } else {
          setChecked(filterValueItem);
        }
      } else {
        const tempChecked = Array.isArray(checked) ? checked : [];
        const include = tempChecked.includes(filterValueItem);
        if (include) {
          setChecked(lodash.without(tempChecked, filterValueItem));
        } else {
          setChecked([...(tempChecked as string[]), filterValueItem]);
        }
      }
    },
    [checked, filterType],
  );

  const handleConfirm = useCallback(() => {
    if (oldChecked !== checked) {
      if (!lodash.isNil(filterValue)) {
        setOldChecked(checked);
      }
      onChange(checked);
    }
    setOpen(false);
  }, [checked, filterValue, onChange, oldChecked]);

  const handleReset = useCallback(() => {
    onChange(initialValue);
    setOldChecked(initialValue);
    setChecked(initialValue);
    setOpen(false);
  }, [initialValue, onChange]);

  return (
    <Popover
      onOpenChange={(open) => {
        if (open) {
          setOpen(true);
        }
      }}
      open={open}
    >
      <PopoverTrigger asChild>
        <IconButton
          active={active}
          aria-expanded={open}
          className="table-filter flex"
          color={active ? 'primary' : 'default'}
          data-testid="table-filter-button"
          filled
          role="combobox"
          tooltip={t('筛选')}
        >
          <FilterFill16 />
        </IconButton>
      </PopoverTrigger>
      <PopoverPortal>
        <PopoverContent
          className={cn(
            'min-w-[120px] max-w-[264px] overflow-hidden border bg-white rounded-sm',
            'z-dropdown text-text-2 border-stroke-border-2 shadow-elevation-2-bottom relative border border-solid',
          )}
          onClick={(e) => {
            e.stopPropagation();
            return false;
          }}
          onCloseAutoFocus={(e) => {
            e.preventDefault();
          }}
          onPointerDownOutside={() => {
            setOpen(false);
            setChecked(oldChecked);
          }}
        >
          <ScrollArea disabledHorizontal maxHeight={ItemsMaxHeight}>
            <div className="max-w-[264px]">
              <Command className="flex flex-col gap-[4px] py-[4px]">
                <CommandList>
                  <CommandEmpty className="py-2">
                    <Empty
                      className="[&_img]:h-[80px]"
                      description={t('暂无数据')}
                      image={<ThemedImage alt="empty" height={80} src={EmptySvg.src} width={128} />}
                    />
                  </CommandEmpty>

                  <CommandGroup>
                    {filters.map((filter) => {
                      const itemChecked =
                        filterType === 'single'
                          ? checked === filter.value
                          : checked?.includes(filter.value);

                      return (
                        <CommandItem
                          key={filter.value}
                          onSelect={() => {
                            handleClick(filter.value);
                          }}
                          value={filter.label}
                        >
                          <Checkbox checked={itemChecked} className="w-full">
                            {filter.label}
                          </Checkbox>
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                </CommandList>
              </Command>
            </div>
          </ScrollArea>
          <div className="border-t-divider-solid flex items-center justify-between border-0 border-t-[1px] border-solid px-1 py-[5px]">
            <Button onClick={handleReset} size="sm" type="text">
              {t('重置')}
            </Button>
            <Button color="primary" onClick={handleConfirm} size="sm" type="text">
              {t('筛选')}
            </Button>
          </div>
        </PopoverContent>
      </PopoverPortal>
    </Popover>
  );
}
