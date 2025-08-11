import { TestBase } from './lib';

class Input extends TestBase {
  static root = '*[data-testid="Input-root"]';

  dataTestIds = {
    root: Input.root,
    input: '*[data-testid="Input-input"]',
    clear: '*[data-testid="Input-clear"]',
  };

  getInput() {
    return `${this.getSelector()} ${this.dataTestIds.input}`;
  }

  getClear() {
    return `${this.getSelector()} ${this.dataTestIds.clear}`;
  }
}

export default Input;
