import { TestBase } from './lib';

class Tag extends TestBase {
  static root = '*[data-testid="Tag-root"]';

  dataTestIds = {
    root: Tag.root,
    close: '*[data-testid="Tag-close"]',
  };

  getCloseByValue(value: string) {
    return `${this.getSelector()}[data-value="${value}"] ${this.dataTestIds.close}`;
  }
}

export default Tag;
