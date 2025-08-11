import { TestBase } from './lib';

class Message extends TestBase {
  static root = '*[data-testid="Message-root"]';

  dataTestIds = {
    root: Message.root,
    close: '*[data-testid="Message-close"]',
  };

  getClose() {
    return `${this.getSelector()} ${this.dataTestIds.close}`;
  }
}

export default Message;
