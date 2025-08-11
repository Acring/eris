import { default as GeneralAlert } from '../Alert';

class Alert extends GeneralAlert {
  close() {
    cy.get(this.getClose()).click();
  }
}

export default Alert;
