import { TestBase } from './lib';

class Switch extends TestBase {
  static root = '*[data-testid="Switch-root"]';

  dataTestIds = {
    root: Switch.root,
    toggle: '*[data-testid="Switch-toggle"]',
  };

  getToggle() {
    return `${this.getSelector()} ${this.dataTestIds.toggle}`;
  }
}

export default Switch;
