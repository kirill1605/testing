import TodoPage from "../pages/l1.2.mjs";
import { expect } from 'chai';
import { Builder, Browser, By } from 'selenium-webdriver';
import { writeFile } from 'fs';
import { promisify } from 'util';
const writeFileAsync = promisify(writeFile);

describe('Todo App', () => {
  let driver;
  let page;
  before(async () => {
    driver = await new Builder().forBrowser(Browser.CHROME).build();
    page = new TodoPage(driver);
  });
  after(async () => {
    await driver.quit();
  });

  afterEach(async function() {
    if (this.currentTest.state === 'failed') {
      const screenshot = await driver.takeScreenshot();
      const testCaseName = this.currentTest.title.replace(/\s+/g, '-').toLowerCase();
      const dateTime = new Date().toISOString().replace(/[-:.]/g, '');
      const fileName = `${testCaseName}-${dateTime}.png`;
      await writeFileAsync(fileName, screenshot, 'base64');
    }
  });

  it('Display elements', async () => {
    await page.open();
    const header = await page.getHeader();
    expect(header).to.equal('LambdaTest Sample App');
  });

  it('Update elements', async () => {
    await page.open();
    let remainingText = await page.getTodoRemainingText();
    expect(remainingText).to.equal('5 of 5 remaining');
    for (let i = 1; i <= 5; i++) {
      await page.clickTodo(i);
      remainingText = await page.getTodoRemainingText();
      expect(remainingText).to.equal(`${5 - i} of 5 remaining`);
    }
    await page.addTodo('Sixth Item');
    remainingText = await page.getTodoRemainingText();
    expect(remainingText).to.equal('1 of 6 remaining');
    await page.clickTodo(6);
    remainingText = await page.getTodoRemainingText();
    expect(remainingText).to.equal('0 of 6 remaining');
  });
});