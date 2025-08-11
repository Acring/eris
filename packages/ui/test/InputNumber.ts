import { TestBase } from './lib';

class InputNumber extends TestBase {
  static root = '*[data-testid="InputNumber-root"]';

  dataTestIds = {
    root: InputNumber.root,
    input: '*[data-testid="InputNumber-input"]',
    up: '*[data-testid="InputNumber-up"]',
    down: '*[data-testid="InputNumber-down"]',
  };

  getInput() {
    return `${this.getSelector()} ${this.dataTestIds.input}`;
  }

  getUp() {
    return `${this.getSelector()} ${this.dataTestIds.up}`;
  }

  getDown() {
    return `${this.getSelector()} ${this.dataTestIds.down}`;
  }
}

export default InputNumber;
