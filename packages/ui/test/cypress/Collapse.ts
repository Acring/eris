import { default as GeneralCollapse } from '../Collapse';

class Collapse extends GeneralCollapse {
  toggle() {
    cy.get(this.getTrigger()).click();
  }
}

export default Collapse;
