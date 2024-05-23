import SortedMarketPage from "../pages/l4.mjs";
import { describe } from "mocha";
import { assert } from "chai";
import { allure } from 'allure-mocha/runtime';

describe("Sorting test", async () => {
  const driver = new SortedMarketPage();

  before(async () => {
    await driver.open();
  });

  after(async () => {
    await driver.closeBrowser();
  });
  afterEach(async function () {
    if (this.currentTest.state === 'failed') {
      const screenshot = await driver.takeScreenshot();
      const testCaseName = this.currentTest.title.replace(/\s+/g, '-').toLowerCase();
      const dateTime = new Date().toISOString().replace(/[-:.]/g, '');
      const fileName = `${testCaseName}-${dateTime}.png`;
      await writeFileAsync(fileName, screenshot, 'base64');
    }
  });

  it("Featured article", async () => {
    await driver.featuredTitle();
    await driver.featuredArticleName();
  });
  it("Search", async () => {
    await driver.searchEnterText("Вторая Мировая Война");
    await driver.searchClick();
  });
  it("Found article", async () => {
    await driver.articleScroll();
    await driver.articleTitle();
    await driver.articleContent();
    await driver.articleLink();
  });
});