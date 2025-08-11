import { TestBase } from './lib';

class Radio extends TestBase {
  static root = '*[data-testid="Radio-root"]';

  dataTestIds = {
    root: Radio.root,
  };

  getRootByValue(value: string) {
    return `${this.getSelector()}[data-value="${value}"]`;
  }
}

export default Radio;
