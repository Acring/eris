import { default as GeneralTabs } from '../Tabs';

class Tabs extends GeneralTabs {
  chooseTab(value: string) {
    cy.get(this.getTabByValue(value)).click();
  }
}

export default Tabs;
