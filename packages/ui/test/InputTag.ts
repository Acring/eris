import { TestBase } from './lib';

class InputTag extends TestBase {
  static root = '*[data-testid="InputTag-root"]';

  dataTestIds = {
    root: InputTag.root,
    input: '*[data-testid="InputTag-input"]',
    clear: '*[data-testid="InputTag-clear"]',
  };

  getInput() {
    return `${this.getSelector()} ${this.dataTestIds.input}`;
  }

  getClear() {
    return `${this.getSelector()} ${this.dataTestIds.clear}`;
  }
}

export default InputTag;
