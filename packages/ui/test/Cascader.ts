import { TestBase } from './lib';

class Cascader extends TestBase {
  static root = '*[data-testid="Cascader-root"]';

  dataTestIds = {
    root: Cascader.root,
    item: '*[data-testid="Cascader-item"]',
    column: '*[data-testid="Cascader-column"]',
  };

  getItemByValue(value: string) {
    return `${this.dataTestIds.item}[data-value="${value}"]`;
  }

  getItemByColumn(columnIndex: number, value: string) {
    return `${this.dataTestIds.column}[data-index="${columnIndex}"] ${this.dataTestIds.item}[data-value="${value}"]`;
  }
}

export default Cascader;
