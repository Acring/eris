import { TestBase } from './lib';

class Badge extends TestBase {
  static root = '*[data-testid="Badge-root"]';

  dataTestIds = {
    root: Badge.root,
  };
}

export default Badge;
