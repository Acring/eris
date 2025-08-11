import { TestBase } from './lib';

class Notification extends TestBase {
  static root = '*[data-testid="Notification-root"]';

  dataTestIds = {
    root: Notification.root,
    close: '*[data-testid="Notification-close"]',
  };

  getClose() {
    return `${this.getSelector()} ${this.dataTestIds.close}`;
  }
}

export default Notification;
