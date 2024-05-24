import ArticleTest from "../pages/l4.mjs";
import { describe } from "mocha";
import fs from 'fs';
import path from 'path';
import { allure } from "allure-mocha/runtime.js";

describe("Article test", function () {
  this.timeout(60000);

  const driver = new ArticleTest();
  const logs = [];

  function logStep(message) {
    logs.push(message);
    console.log(message);
  }

  async function takeScreenshot(testName) {
    const date = new Date().toISOString().replace(/:/g, '-');
    const screenshotDir = "screenshots";
    const screenshotPath = path.join(screenshotDir, `${testName}_${date}.png`);

    try {
      if (!fs.existsSync(screenshotDir)) {
        fs.mkdirSync(screenshotDir);
      }

      const image = await driver.takeScreenshot();
      fs.writeFileSync(screenshotPath, image, 'base64');

      logStep(`Screenshot saved to: ${screenshotPath}`);
      allure.attachment("Screenshot", fs.readFileSync(screenshotPath), "image/png");
    } catch (error) {
      console.error("Error occurred while taking and saving screenshot:", error);
    }
  }

  before(async () => {
    await driver.open();
  });

  after(async () => {
    await driver.closeBrowser();
  });

  afterEach(async function () {
    if (this.currentTest.state === 'failed') {
      await takeScreenshot(this.currentTest.title.replace(/\s+/g, '_'));
      allure.attachment("Log", Buffer.from(logs.join("\n")), "text/plain");
    }
  });

  it('Featured article', async function () {
    await allure.step("Step 1. Displayed the title", async () => {
      try {
        await driver.featuredTitle();
        logStep("Displayed the title");
        allure.attachment("Log", Buffer.from(logs.join("\n")), "text/plain");
      } catch (error) {
        logStep(`Error: ${error}`);
        await takeScreenshot(this.test.title.replace(/\s+/g, '_'));
        throw error;
      }
    });

    await allure.step("Step 2. Displayed the article name", async () => {
      try {
        await driver.featuredArticleName();
        logStep("Displayed the article name");
        allure.attachment("Log", Buffer.from(logs.join("\n")), "text/plain");
      } catch (error) {
        logStep(`Error: ${error}`);
        await takeScreenshot(this.test.title.replace(/\s+/g, '_'));
        throw error;
      }
    });
  });

  it('Featured article', async function () {
    await allure.step("Step 1. Enter text", async () => {
      try {
        await driver.searchEnterText("Вторая Мировая Война");
        logStep("Text entered");
        allure.attachment("Log", Buffer.from(logs.join("\n")), "text/plain");
      } catch (error) {
        logStep(`Error: ${error}`);
        await takeScreenshot(this.test.title.replace(/\s+/g, '_'));
        throw error;
      }
    });

    await allure.step("Step 2. Click for search", async () => {
      try {
        await driver.searchClick();
        logStep("Search founded and clicked");
        allure.attachment("Log", Buffer.from(logs.join("\n")), "text/plain");
      } catch (error) {
        logStep(`Error: ${error}`);
        await takeScreenshot(this.test.title.replace(/\s+/g, '_'));
        throw error;
      }
    });
  });

  it('Featured article', async function () {
    await allure.step("Step 1. Check article title", async () => {
      try {
        await driver.articleTitle();
        logStep("Title correct");
        allure.attachment("Log", Buffer.from(logs.join("\n")), "text/plain");
      } catch (error) {
        logStep(`Error: ${error}`);
        await takeScreenshot(this.test.title.replace(/\s+/g, '_'));
        throw error;
      }
    });

    await allure.step("Step 2. Scroll to the content", async () => {
      try {
        await driver.articleScroll();
        logStep("Page scrolled");
        allure.attachment("Log", Buffer.from(logs.join("\n")), "text/plain");
      } catch (error) {
        logStep(`Error: ${error}`);
        await takeScreenshot(this.test.title.replace(/\s+/g, '_'));
        throw error;
      }
    });

    await allure.step("Step 3. Go to the item", async () => {
      try {
        await driver.articleContent();
        logStep("The item was opened");
        allure.attachment("Log", Buffer.from(logs.join("\n")), "text/plain");
      } catch (error) {
        logStep(`Error: ${error}`);
        await takeScreenshot(this.test.title.replace(/\s+/g, '_'));
        throw error;
      }
    });

    await allure.step("Step 4. Open new page", async () => {
      try {
        await driver.articleLink();
        logStep("New page opened successfully");
        allure.attachment("Log", Buffer.from(logs.join("\n")), "text/plain");
      } catch (error) {
        logStep(`Error: ${error}`);
        await takeScreenshot(this.test.title.replace(/\s+/g, '_'));
        throw error;
      }
    });
  });
});
