import { default as GeneralMessage } from '../Message';

class Message extends GeneralMessage {
  close() {
    cy.get(this.getClose()).click();
  }
}

export default Message;
