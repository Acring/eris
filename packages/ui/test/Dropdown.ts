import { TestBase } from './lib';

class Dropdown extends TestBase {
  static root = '*[data-testid="Dropdown-root"]';

  dataTestIds = {
    root: Dropdown.root,
    menuItem: '*[data-testid="Dropdown-menuItem"]',
  };

  getMenuItemByValue(value: string) {
    return `${this.dataTestIds.menuItem}[data-value="${value}"]`;
  }
}

export default Dropdown;
