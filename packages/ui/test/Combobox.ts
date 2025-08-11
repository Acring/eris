import { TestBase } from './lib';

class Combobox extends TestBase {
  static root = '*[data-testid="Combobox-root"]';

  dataTestIds = {
    root: Combobox.root,
    item: '*[data-testid="Combobox-item"]',
  };

  getItemByValue(value: string) {
    return `${this.dataTestIds.item}[data-value="${value}"]`;
  }
}

export default Combobox;
