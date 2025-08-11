import { default as GeneralCombobox } from '../Combobox';

class Combobox extends GeneralCombobox {
  open() {
    cy.get(this.getSelector()).click();
  }
  choose(value: string) {
    cy.get(this.getItemByValue(value)).click();
  }
}

export default Combobox;
