import { default as GeneralDrawer } from '../Drawer';

class Drawer extends GeneralDrawer {
  close() {
    cy.get(this.getClose()).click();
  }
}

export default Drawer;
