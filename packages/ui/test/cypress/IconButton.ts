import { default as GeneralIconButton } from '../IconButton';

class IconButton extends GeneralIconButton {
  click() {
    cy.get(this.getSelector()).click();
  }
}

export default IconButton;
