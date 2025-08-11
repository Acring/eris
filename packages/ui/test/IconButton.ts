import { TestBase } from './lib';

class IconButton extends TestBase {
  static root = '*[data-testid="IconButton-root"]';
  dataTestIds = {
    root: IconButton.root,
  };
}

export default IconButton;
