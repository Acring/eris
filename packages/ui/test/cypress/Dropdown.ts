import { default as GeneralDropdown } from '../Dropdown';

class Dropdown extends GeneralDropdown {
  click() {
    cy.get(this.getSelector()).click();
  }
  op(value: string) {
    cy.get(this.getMenuItemByValue(value)).click();
  }
}

export default Dropdown;
