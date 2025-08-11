import { TestBase } from './lib';

class Drawer extends TestBase {
  dataTestIds = {
    content: '*[data-testid="Drawer-content"]',
    close: '*[data-testid="Drawer-close"]',
  };
  getClose() {
    return `${this.dataTestIds.content} ${this.dataTestIds.close}`;
  }
}

export default Drawer;
