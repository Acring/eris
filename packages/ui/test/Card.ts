import { TestBase } from './lib';

class Card extends TestBase {
  static root = '*[data-testid="Card-root"]';

  dataTestIds = {
    root: Card.root,
    title: '*[data-testid="Card-title"]',
  };
}

export default Card;
