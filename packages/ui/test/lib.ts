class TestBase {
  private selector = '';
  constructor(selector?: string) {
    if (selector) {
      this.selector = selector;
    }
  }
  getSelector() {
    return this.selector;
  }
}

export { TestBase };
