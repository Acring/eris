import { default as GeneralTag } from '../Tag';

class Tag extends GeneralTag {
  closeByValue(value: string) {
    cy.get(this.getCloseByValue(value)).click();
  }
}

export default Tag;
