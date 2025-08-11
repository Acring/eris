import { default as GeneralButton } from '../Button';

class Button extends GeneralButton {
  click() {
    cy.get(this.getSelector()).click();
  }
}

export default Button;
