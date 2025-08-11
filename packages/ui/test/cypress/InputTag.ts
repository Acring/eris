import { default as GeneralInputTag } from '../InputTag';

class InputTag extends GeneralInputTag {
  input(value: string) {
    cy.get(this.getInput()).type(`${value}{enter}`);
  }
  clear() {
    cy.get(this.getClear()).invoke('show').click();
  }
}

export default InputTag;
