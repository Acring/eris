import { TestBase } from './lib';

class Tabs extends TestBase {
  static root = '*[data-testid="Tabs-root"]';

  dataTestIds = {
    root: Tabs.root,
    tab: '*[data-testid="Tabs-tab"]',
  };

  getTabByValue(value: string) {
    return `${this.getSelector()} ${this.dataTestIds.tab}[data-value="${value}"]`;
  }
}

export default Tabs;
