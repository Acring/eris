import { TestBase } from './lib';

class Empty extends TestBase {
  static root = '*[data-testid="Empty-root"]';
  dataTestIds = {
    root: Empty.root,
  };
}

export default Empty;
