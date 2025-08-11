import { TestBase } from './lib';

class Divider extends TestBase {
  static root = '*[data-testid="Divider-root"]';

  dataTestIds = {
    root: Divider.root,
  };
}

export default Divider;
