import BasePage from "./basepage.mjs";
import { By } from "selenium-webdriver";

class SchedulePage extends BasePage {
  constructor(driver) {
    super(driver);
    this.driver = driver;
  }
  async checkGroups() {
    const groupNumber = '221-323';
    const searchField = await this.driver.findElement(By.className('groups'));
    await searchField.sendKeys(groupNumber);
    const resultElements = await this.driver.findElements(By.className('group'));
    const groupTexts = await Promise.all(resultElements.map(async (element) => {
      return await element.getText();
    }));
    if (groupTexts.length === 1 && groupTexts[0] === groupNumber) {
      await this.driver.findElement(By.id(groupNumber)).click();
    }
    await this.driver.sleep(1000);
  }
  async clickGroup() {
    const groupNumber = '221-323';
    await this.driver.findElement(By.id(groupNumber)).click()
    await this.driver.sleep(1000);
  }
  async checkColor() {
    await this.driver.findElement(By.className('goToToday')).click();
    const parentElements = [await this.driver.findElement(By.className("schedule-day_today"))];
    const data = await Promise.all(parentElements.map(async (element) => {
      const title = await element.findElement(By.className("schedule-day__title")).getText();
      return title;
    }));
    return data;
  }
}

export default SchedulePage;
