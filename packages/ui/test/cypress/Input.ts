import { default as GeneralInput } from '../Input';

class Input extends GeneralInput {
  input(value: string) {
    cy.get(this.getInput()).type(value);
  }
  clear() {
    cy.get(this.getClear()).click();
  }
}

export default Input;
