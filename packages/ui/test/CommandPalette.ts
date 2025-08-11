import { TestBase } from './lib';

class CommandPalette extends TestBase {
  static root = '*[data-testid="CommandPalette-root"]';

  dataTestIds = {
    root: CommandPalette.root,
    input: '*[data-testid="CommandPalette-input"]',
  };

  getInput() {
    return `${this.getSelector()} ${this.dataTestIds.input}`;
  }
}

export default CommandPalette;
