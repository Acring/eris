import { default as GeneralInputNumber } from '../InputNumber';

class InputNumber extends GeneralInputNumber {
  input(value: string) {
    cy.get(this.getInput()).type(value);
  }
  up() {
    cy.get(this.getUp()).click();
  }
  down() {
    cy.get(this.getDown()).click();
  }
}

export default InputNumber;
