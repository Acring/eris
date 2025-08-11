import { TestBase } from './lib';

class Button extends TestBase {
  static root = '*[data-testid="Button-root"]';

  dataTestIds = {
    root: Button.root,
  };
}

export default Button;
