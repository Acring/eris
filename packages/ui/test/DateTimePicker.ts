import { TestBase } from './lib';

class DateTimePicker extends TestBase {
  static root = '*[data-testid="DateTimePicker-root"]';

  dataTestIds = {
    root: DateTimePicker.root,
    dayPicker: '*[data-testid="DateTimePicker-dayPicker"]',
  };

  getDayPicker() {
    return this.dataTestIds.dayPicker;
  }

  /**
   * date format: 'YYYY-MM-DD'
   */
  getDayByDate(date: string) {
    return `${this.getDayPicker()} *[data-date="${date}"]`;
  }
}

export default DateTimePicker;
