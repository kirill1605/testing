import BasePage from "./basepage.mjs";
import { By } from "selenium-webdriver";
import { allure } from 'allure-mocha/runtime';

class SortedMarketPage extends BasePage {
  constructor() {
    super();
  }

  async open() {
    await this.goToUrl("https://ru.wikipedia.org/wiki/Заглавная_страница");
    await driver.manage().window().maximize();
    driver.manage().setTimeouts({ implicit: 3000 });
  }

  async featuredTitle() {
    let elements = await driver.findElements(By.xpath('//span[@class="mw-headline"]//div[@class="main-box-subtitle"]'));

    for (let element of elements) {
      let text = await element.getText();
      if (text === "Избранная статья") {
        console.log(text);
      }
    }
  }

  async featuredArticleName() {
    let elements = await driver.findElements(By.xpath('//div[@id="main-tfa"]/h2/span[@class="mw-headline"]/div[@class="fake-heading h2 main-header"]/a'));

    for (let element of elements) {
      let text = await element.getText();
      console.log(text);
    }
  }

  async searchEnterText(text) {
    await this.enterText(By.id("searchInput"), text);
    await driver.sleep(3000);
  }

  async articleTitle() {
    let elements = await driver.findElements(By.xpath('//h1/span[@class="mw-page-title-main"]'));

    for (let element of elements) {
      let text = await element.getText();
      console.log(text);

      if (text === "Вторая мировая война") {

      } else {
        throw new Error("Error: Incorrect title. Expected 'Вторая мировая война'");
      }
    }
  }

  async articleScroll() {
    await driver.executeScript("window.scrollBy(0, 1000);");
    await driver.sleep(2000);
  }

  async articleContent() {
    await this.click(By.xpath("//div[@id='toc']/ul/li[5]/ul/li[2]/a"));
    await driver.sleep(2000);
  }

  async searchClick() {
    await this.click(By.id("searchButton"));
  }

  async articleLink() {
    await this.click(By.xpath("//*[@id='mw-content-text']/div[1]/div[20]/b[1]/a"));
    await driver.sleep(2000);
  }
}

export default SortedMarketPage;