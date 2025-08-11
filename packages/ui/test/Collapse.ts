import { TestBase } from './lib';

class Collapse extends TestBase {
  static root = '*[data-testid="Collapse-root"]';

  dataTestIds = {
    root: Collapse.root,
    trigger: '*[data-testid="Collapse-trigger"]',
    description: '*[data-testid="Collapse-description"]',
  };

  getTrigger() {
    return `${this.getSelector()} ${this.dataTestIds.trigger}`;
  }
}

export default Collapse;
