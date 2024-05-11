import { Builder, Browser } from "selenium-webdriver";

class BasePage {
  constructor(driver) {
    this.driver = driver;
  }
  async open() {
    await this.driver.get('https://mospolytech.ru/');
  }
  async clickSchedule() {
    await this.driver.findElement(By.xpath("//a[@href='/obuchauschimsya/raspisaniya/']")).click();
  }
  async clickSeeOnWebsite() {
    await this.driver.findElement(By.xpath("//a[@href='https://rasp.dmami.ru/']")).click();
  }
  async checkTabs() {
    const initialWindowHandle = await this.driver.getWindowHandle();
    const newWindowHandle = await this.driver.wait(async () => {
      const handlesAfterAction = await this.driver.getAllWindowHandles();
      return handlesAfterAction.find(handle => handle !== initialWindowHandle);
    }, 3000);
    if (newWindowHandle) {
      await this.driver.switchTo().window(newWindowHandle);
    }
  }
  async getTitle() {
    return await this.driver.findElement(By.xpath('//h1')).getText();
  }
}

export default BasePage;