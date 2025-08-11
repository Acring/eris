import { TestBase } from './lib';

class Checkbox extends TestBase {
  static root = '*[data-testid="Checkbox-root"]';

  dataTestIds = {
    root: Checkbox.root,
    check: '*[data-testid="Checkbox-check"]',
    label: '*[data-testid="Checkbox-label"]',
  };

  getCheck() {
    return `${this.getSelector()} ${this.dataTestIds.check}`;
  }
}

export default Checkbox;
