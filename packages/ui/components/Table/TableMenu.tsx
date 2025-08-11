import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import lodash from 'lodash';
import type { TableMenuProps } from './type';
import t from '../../i18n';
import Dropdown, { type Menu } from '../Dropdown/Dropdown';

export default function TableMenu<TData>(props: TableMenuProps<TData>) {
  const { uniqueKey, selected, pos, items = [], nameKey, data, onClose, ...rest } = props;

  const [open, setOpen] = React.useState(false);

  /**
   * Open menu when position is ready
   */
  useEffect(() => {
    if (pos.y !== null && pos.x !== null) {
      setOpen(true);
    }
  }, [pos]);

  const anchorPosition = pos.y !== null && pos.x !== null ? { top: pos.y, left: pos.x } : {};

  const one = data.find(
    (row) => lodash.get(row, uniqueKey) === lodash.get(selected[0], uniqueKey),
  ) as TData;
  const label = one ? lodash.get(one, nameKey) : '';

  const menuTitle =
    selected?.length === 1 ? label : t('已选 {{num}} 项', { num: selected?.length || 0 });

  const menuJustClicked = useRef(false);

  const onMenuClick = (menu: Menu) => {
    if (!menu.children) {
      onClose('select');
      menuJustClicked.current = true;
    }
  };

  const onOpenChange = (open: boolean) => {
    if (!open) {
      setOpen(false);
      // If "onItemClick" has been called just now, we don't "clickAway".
      if (!menuJustClicked.current) {
        onClose('clickAway');
      }
      // clean state
      menuJustClicked.current = false;
    }
  };

  return createPortal(
    <div
      className="table-context-menu z-[1400] fixed"
      data-menu-type="context"
      data-position="mouse"
      style={{ ...anchorPosition }}
    >
      {open ? (
        <Dropdown
          defaultOpen
          menuList={items}
          menuTitle={menuTitle}
          onMenuClick={onMenuClick}
          onOpenChange={onOpenChange}
          open
          {...rest}
        />
      ) : null}
    </div>,
    document.body,
  );
}
