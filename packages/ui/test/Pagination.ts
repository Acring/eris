import { TestBase } from './lib';

class Pagination extends TestBase {
  static root = '*[data-testid="Pagination-root"]';

  dataTestIds = {
    root: Pagination.root,
    prev: '*[data-testid="Pagination-prev"]',
    next: '*[data-testid="Pagination-next"]',
  };

  getPrev() {
    return `${this.getSelector()} ${this.dataTestIds.prev}`;
  }

  getNext() {
    return `${this.getSelector()} ${this.dataTestIds.next}`;
  }
}

export default Pagination;
