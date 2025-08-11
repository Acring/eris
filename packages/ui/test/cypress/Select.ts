import { default as GeneralSelect } from '../Select';

class Select extends GeneralSelect {
  open() {
    cy.get(this.getSelector()).click();
  }
  chooseItem(value: string) {
    cy.get(this.getItemByValue(value)).click();
  }
}

export default Select;
