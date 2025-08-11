import { default as GeneralPagination } from '../Pagination';

class Pagination extends GeneralPagination {
  prev() {
    cy.get(this.getPrev()).click();
  }
  next() {
    cy.get(this.getNext()).click();
  }
}

export default Pagination;
