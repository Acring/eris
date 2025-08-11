import { default as GeneralNotification } from '../Notification';

class Notification extends GeneralNotification {
  close() {
    cy.get(this.getClose()).click();
  }
}

export default Notification;
