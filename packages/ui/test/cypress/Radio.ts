import { default as GeneralRadio } from '../Radio';

class Radio extends GeneralRadio {
  chooseByValue(value: string) {
    cy.get(this.getRootByValue(value)).click();
  }
}

export default Radio;
