import { TestBase } from './lib';

class Breadcrumb extends TestBase {
  static root = '*[data-testid="Breadcrumb-root"]';

  dataTestIds = {
    root: Breadcrumb.root,
    list: '*[data-testid="Breadcrumb-list"]',
    item: '*[data-testid="Breadcrumb-item"]',
  };
}

export default Breadcrumb;
