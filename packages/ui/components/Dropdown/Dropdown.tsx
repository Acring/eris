'use client';
import type { MutableRefObject } from 'react';
import React, { useState, useRef, useCallback, useEffect } from 'react';
import lodash from 'lodash';
import { cva } from 'class-variance-authority';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { DownLine16, RightLine16, MoreLine16 } from '@xsky/eris-icons';
import { cn } from '../../lib/utils';
import type { TooltipProps } from '../Tooltip';
import { Tooltip } from '../Tooltip';
import { Button } from '../Button';
import { IconButton } from '../IconButton';
import { Spinner } from '../Spinner';
import { Empty } from '../Empty';
import { ScrollArea } from '../ScrollArea';
import { type SizeType } from '../../lib/type';

const collisionPadding = {
  top: 16,
  bottom: 16,
  left: 4,
  right: 4,
};

//hover 延迟
const DROPDOWN_HOVER_DELAY = 200;

type ContentProps = React.ComponentProps<typeof DropdownMenu.Content>;

const menuItemVariants = cva(
  cn('text-text-2 text-body data-[state=open]:bg-grey-50 hover:outline-none'),
  {
    variants: {
      disabled: {
        true: cn('text-offline-disable cursor-not-allowed [&_*]:!text-offline-disable'),
        false: cn('cursor-pointer hover:bg-grey-50 focus-visible:bg-grey-100 active:bg-grey-100'),
      },
      selected: {
        true: cn('bg-grey-100'),
        false: cn(''),
      },
    },
  },
);
const menuContentVariants = cva('z-dropdown', {
  variants: {
    type: {
      main: cn('data-[side=bottom]:pt-[4px] data-[side=top]:pb-[4px]'),
      sub: cn('data-[side=left]:pr-[4px] data-[side=right]:pl-[4px]'),
    },
    trigger: {
      contextMenu: cn('hidden'),
    },
  },
});

export interface DropdownProps {
  className?: string;
  disabled?: boolean;
  tooltipProps?: Omit<TooltipProps, 'children'>;
  type?: 'primary' | 'secondary' | 'outlined' | 'text' | 'more';
  label?: string | React.ReactNode;
  defaultOpen?: boolean;
  menuTitle?: string;
  open?: boolean;
  placement?: 'start' | 'center' | 'end';
  menuList?: Menu[];
  children?: React.ReactNode;
  trigger?:
    | ('hover' | 'click')[]
    | { type: 'contextMenu'; ref: MutableRefObject<HTMLElement | null> };
  loading?: boolean;
  selectable?: boolean;
  defaultSelectedKey?: string;
  size?: SizeType;
  arrow?: boolean;
  onOpenChange?: (open: boolean) => void;
  onMenuClick?: (item: Menu) => void;
}

export interface Menu {
  key?: string;
  label?: string | React.ReactNode;
  disabled?: boolean;
  tooltips?: string | React.ReactNode;
  children?: Menu[];
  type?: 'divider';
  onClick?: (item: Menu) => void;
  icon?: React.ReactNode;
}

/**
 * Owner: 陈胜
 *
 * Figma: https://www.figma.com/file/Do849NlMKTXCv8djOFIFWA/%E9%80%9A%E7%94%A8%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83?type=design&node-id=11723-60142&mode=design
 *
 * 下拉菜单组件
 */
const Dropdown = React.forwardRef<HTMLButtonElement, DropdownProps>(
  (
    {
      className,
      disabled,
      type = 'outlined',
      size = 'md',
      defaultOpen = false,
      label,
      loading = false,
      menuList,
      open: controlledOpen,
      placement = 'start',
      menuTitle,
      trigger = ['click'],
      onOpenChange,
      onMenuClick,
      selectable = false,
      defaultSelectedKey,
      ...props
    },
    ref,
  ) => {
    const dropdownContentRef = useRef<HTMLDivElement>(null);
    const [internalOpen, setInternalOpen] = useState(defaultOpen);
    const [triggerMinWidth, setTriggerMinWidth] = useState(0);
    const [selectedKey, setSelectedKey] = useState<string | undefined>(
      defaultSelectedKey || (selectable && menuList?.length ? menuList[0].key : undefined),
    );

    const triggerRef = useRef<any>(null);

    useEffect(() => {
      setTriggerMinWidth(triggerRef.current?.clientWidth);
    }, []);

    // Update selectedKey when menuList changes and we need to default to first item
    useEffect(() => {
      if (selectable && !defaultSelectedKey && menuList?.length && !selectedKey) {
        setSelectedKey(menuList[0].key);
      }
    }, [selectable, defaultSelectedKey, menuList, selectedKey]);

    useEffect(() => {
      if (!Array.isArray(trigger) && trigger.ref.current) {
        trigger.ref.current.addEventListener('contextmenu', handleTriggerContextMenu);
        document.addEventListener('click', handleCloseContextMenu);
      }

      return () => {
        if (!Array.isArray(trigger) && trigger.ref.current) {
          trigger.ref.current.removeEventListener('contextmenu', handleTriggerContextMenu);
          document.removeEventListener('click', handleCloseContextMenu);
        }
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [trigger]);

    const triggerEquals = useCallback(
      (type: 'hover' | 'click') => {
        return Array.isArray(trigger) && trigger.includes(type);
      },
      [trigger],
    );

    const triggerRightClick = useCallback(() => {
      return !Array.isArray(trigger) && trigger.type;
    }, [trigger]);

    // Get the selected menu item based on selectedKey
    const getSelectedMenuItem = useCallback(() => {
      if (!selectedKey || !menuList?.length) return undefined;

      let selected: Menu | undefined;

      const findMenuItem = (items: Menu[] = []): boolean => {
        for (const item of items) {
          if (item.key === selectedKey) {
            selected = item;
            return true;
          }

          if (item.children?.length) {
            if (findMenuItem(item.children)) {
              return true;
            }
          }
        }
        return false;
      };

      findMenuItem(menuList);
      return selected;
    }, [menuList, selectedKey]);

    const selectedMenuItem = getSelectedMenuItem();

    const handleTriggerMouseEnter = () => {
      if (triggerEquals('hover')) {
        setTimeout(() => {
          setInternalOpen(true);
        }, DROPDOWN_HOVER_DELAY);
      }
    };

    const handleTriggerClick = useCallback(() => {
      if (triggerEquals('click') && controlledOpen === undefined) {
        setInternalOpen((prevOpen: boolean) => !prevOpen);
      }
    }, [controlledOpen, triggerEquals]);

    const handleTriggerMouseLeave = () => {
      if (triggerEquals('hover')) {
        setTimeout(() => {
          setInternalOpen(false);
        }, DROPDOWN_HOVER_DELAY);
      }
    };

    const handleMenuItemClick = (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      const menuKey = e.currentTarget.getAttribute('data-key');
      if (menuKey) {
        let targetMenu: Menu | undefined;

        const _innerFindTargetMenu = (menuList: Menu[] = []): boolean => {
          for (const menuItem of menuList) {
            if (menuItem.key === menuKey) {
              targetMenu = menuItem;
              return true;
            }

            if (menuItem.children?.length && _innerFindTargetMenu(menuItem.children)) {
              return true;
            }
          }
          return false;
        };

        _innerFindTargetMenu(menuList);

        if (targetMenu && !targetMenu.disabled) {
          // Update selected key if selectable is true and item has no children
          if (selectable && !targetMenu.children) {
            setSelectedKey(targetMenu.key);
          }

          // 优先判断菜单内部的 onClick 事件，其次再获取 onMenuClick 事件
          targetMenu.onClick?.(targetMenu);
          onMenuClick?.(targetMenu);
          setInternalOpen(false);
          onOpenChange?.(false);
        }
      }
    };

    const handleCloseContextMenu = useCallback(() => {
      if (triggerRightClick()) {
        setInternalOpen(false);
      }
    }, [triggerRightClick]);

    const handleTriggerContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      setInternalOpen(true);
      setTimeout(() => {
        if (dropdownContentRef.current?.style) {
          dropdownContentRef.current.style.position = 'relative';
          dropdownContentRef.current.style.left = `${e.pageX || 0}px`;
          dropdownContentRef.current.style.top = `${e.pageY || 0}px`;
          dropdownContentRef.current.style.display = 'block';
        }
      }, 0);
      return false;
    };

    const handlePointerDownOutside: ContentProps['onPointerDownOutside'] = (e) => {
      // 点击 触发容器和 Content 之外的部分时，隐藏
      if (triggerEquals('click') && triggerRef?.current?.contains?.(e.target) === false) {
        setInternalOpen(false);
      }
    };

    // 判断是否需要显示箭头
    const getArrow = () => {
      if (props.arrow === undefined) {
        if (selectable) {
          return false;
        }
        return true;
      }

      return props.arrow;
    };

    const renderMenuItem = (menu: Menu, index: number) => {
      const { type, label, disabled = false, tooltips, children, icon } = menu;
      const key = menu.key ? menu.key : `item_${Math.random().toFixed(5)}`;
      // 赋值
      menu.key = key;

      const isSelected = selectable && selectedKey === key;

      if (type === 'divider') {
        return (
          <DropdownMenu.Separator
            className={cn(
              'border-stroke-border-2 relative left-[10px] my-[4px] w-[calc(100%-25px)] border-b-0 border-t-[1px] border-solid',
            )}
            key={key ?? index}
          />
        );
      }

      if (children) {
        return (
          <DropdownMenu.Sub key={key}>
            <DropdownMenu.SubTrigger
              className={menuItemVariants({ disabled })}
              data-testid="Dropdown-menuItem"
              data-value={label}
            >
              <div className={cn('flex items-center justify-between px-2 py-[6px]')}>
                <div className="flex items-center">
                  {icon ? <span className="mr-[4px] flex items-center">{icon}</span> : null}
                  {React.isValidElement(label) ? label : <span>{label}</span>}
                </div>
                <RightLine16 className={cn('ml-1 mr-[-5px]')} />
              </div>
            </DropdownMenu.SubTrigger>
            <DropdownMenu.Portal>
              <DropdownMenu.SubContent
                className={menuContentVariants({
                  type: 'sub',
                })}
              >
                <div
                  className={cn(
                    'rounded-radius-sm border-stroke-border-2 shadow-elevation-2-bottom relative border border-solid bg-white py-[4px]',
                  )}
                >
                  {children.map(renderMenuItem)}
                </div>
              </DropdownMenu.SubContent>
            </DropdownMenu.Portal>
          </DropdownMenu.Sub>
        );
      }

      return (
        <DropdownMenu.Item
          className={menuItemVariants({ disabled, selected: isSelected })}
          data-key={key}
          data-testid="Dropdown-menuItem"
          data-value={label}
          key={key}
          onClick={handleMenuItemClick}
        >
          {tooltips ? (
            <Tooltip side="right" title={tooltips}>
              <div className={cn('px-2 py-[6px]')}>
                <div className="flex items-center">
                  {icon ? <span className="mr-[4px] flex items-center">{icon}</span> : null}
                  {label}
                </div>
              </div>
            </Tooltip>
          ) : (
            <div className={cn('px-2 py-[6px]')} data-key={key}>
              <div className="flex items-center">
                {icon ? <span className="mr-[4px] flex items-center">{icon}</span> : null}
                {label}
              </div>
            </div>
          )}
        </DropdownMenu.Item>
      );
    };

    const renderDropdownLabel = () => {
      const showArrow = getArrow();

      return (
        <DropdownMenu.Trigger
          asChild
          className={className}
          data-testid="Dropdown-root"
          disabled={disabled}
          onClick={handleTriggerClick}
          onMouseEnter={handleTriggerMouseEnter}
          onMouseLeave={handleTriggerMouseLeave}
          ref={triggerRef}
        >
          {triggerRightClick() ? (
            <span className="fixed top-0 left-0 z-0" />
          ) : React.isValidElement(label) ? (
            <div>{label}</div>
          ) : type === 'more' ? (
            <IconButton className=" items-center">
              <MoreLine16 />
            </IconButton>
          ) : label || (selectable && selectedMenuItem) ? (
            <Button
              className={cn(
                'relative after:absolute after:bottom-[-4px] after:left-0 after:z-50 after:block after:h-[4px] after:w-[100%]  after:content-[""]',
              )}
              ref={ref}
              size={size}
              type={type}
            >
              {selectable && selectedMenuItem?.icon ? (
                <span className="mr-[4px] flex items-center">{selectedMenuItem.icon}</span>
              ) : null}
              <span className={cn({ 'mr-[4px]': !selectable })}>{label}</span>
              {showArrow ? (
                <DownLine16
                  className={cn('transform transition-transform duration-200', {
                    'rotate-180': finalOpen,
                  })}
                />
              ) : null}
            </Button>
          ) : (
            <span />
          )}
        </DropdownMenu.Trigger>
      );
    };

    const finalOpen = controlledOpen === undefined ? internalOpen : controlledOpen;

    return (
      <DropdownMenu.Root
        defaultOpen={defaultOpen}
        modal={false}
        onOpenChange={onOpenChange}
        open={finalOpen}
      >
        {/* 触发器 */}
        {props.tooltipProps && !triggerRightClick() ? (
          <Tooltip {...props.tooltipProps}>{renderDropdownLabel()}</Tooltip>
        ) : (
          renderDropdownLabel()
        )}

        {/* 下拉菜单 */}
        <DropdownMenu.Portal
          container={!Array.isArray(trigger) ? trigger?.ref.current : document.body}
        >
          <DropdownMenu.Content
            align={placement}
            className={cn(
              menuContentVariants({
                type: 'main',
                trigger: triggerRightClick() ? 'contextMenu' : undefined,
              }),
            )}
            collisionPadding={collisionPadding}
            onMouseEnter={handleTriggerMouseEnter}
            onMouseLeave={handleTriggerMouseLeave}
            onPointerDownOutside={handlePointerDownOutside}
            ref={dropdownContentRef}
            {...props}
          >
            <div
              className={cn(
                'rounded-radius-sm border-stroke-border-2 shadow-elevation-2-bottom relative border border-solid bg-white py-[4px]',
                {
                  'w-[100px] h-[160px] flex justify-center items-center':
                    loading || lodash.isEmpty(menuList),
                },
              )}
              style={triggerMinWidth ? { minWidth: `${triggerMinWidth}px` } : {}}
            >
              <ScrollArea
                disabledHorizontal
                maxHeight="calc(var(--radix-popper-available-height) - 12px)"
              >
                {loading ? (
                  <Spinner />
                ) : lodash.isEmpty(menuList) ? (
                  <Empty className="scale-90" />
                ) : (
                  <>
                    {menuTitle ? (
                      <DropdownMenu.Item
                        className={cn(menuItemVariants(), 'bg-grey-50')}
                        data-testid="Dropdown-menuItem"
                        data-value={menuTitle}
                      >
                        <span className={cn('block px-2 py-[6px]')}>{menuTitle}</span>
                      </DropdownMenu.Item>
                    ) : null}
                    {menuList?.map(renderMenuItem)}
                  </>
                )}
              </ScrollArea>
            </div>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    );
  },
);

Dropdown.displayName = 'Dropdown';

export default Dropdown;
