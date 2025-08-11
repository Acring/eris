import { TestBase } from './lib';

class Alert extends TestBase {
  static root = '*[data-testid="Alert-root"]';

  dataTestIds = {
    root: Alert.root,
    close: '*[data-testid="Alert-close"]',
  };

  getClose() {
    return `${this.getSelector()} ${this.dataTestIds.close}`;
  }
}

export default Alert;
