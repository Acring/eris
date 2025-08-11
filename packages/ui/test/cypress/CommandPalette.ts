import { default as GeneralCommandPalette } from '../CommandPalette';

class CommandPalette extends GeneralCommandPalette {
  gotoByValue(value: string) {
    cy.get(this.getInput()).type(`${value}{enter}`);
  }
}

export default CommandPalette;
