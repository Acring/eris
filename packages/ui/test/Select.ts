import { TestBase } from './lib';

class Select extends TestBase {
  static root = '*[data-testid="Select-root"]';

  dataTestIds = {
    root: Select.root,
    item: '*[data-testid="Select-item"]',
  };

  getItemByValue(value: string) {
    return `${this.dataTestIds.item}[data-value="${value}"]`;
  }
}

export default Select;
