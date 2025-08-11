import { default as GeneralCascader } from '../Cascader';

class Cascader extends GeneralCascader {
  open() {
    cy.get(this.getSelector()).click();
  }
  choose(value: string) {
    cy.get(this.getItemByValue(value)).click();
  }
  chooseByColumn(columnIndex: number, value: string) {
    cy.get(this.getItemByColumn(columnIndex, value)).click();
  }
}

export default Cascader;
