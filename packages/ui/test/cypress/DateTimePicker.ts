import { default as GeneralDateTimePicker } from '../DateTimePicker';

class DateTimePicker extends GeneralDateTimePicker {
  openDate() {
    cy.get(this.getSelector()).click();
  }
  /**
   * date format: 'YYYY-MM-DD'
   */
  chooseDate(date: string) {
    cy.get(this.getDayByDate(date)).click();
  }
}

export default DateTimePicker;
