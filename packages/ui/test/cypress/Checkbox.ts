import { default as GeneralCheckbox } from '../Checkbox';

class Checkbox extends GeneralCheckbox {
  check() {
    cy.get(this.getCheck()).click();
  }
}

export default Checkbox;
