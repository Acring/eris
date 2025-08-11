import { default as GeneralSwitch } from '../Switch';

class Switch extends GeneralSwitch {
  toggle() {
    cy.get(this.getToggle()).click();
  }
}

export default Switch;
