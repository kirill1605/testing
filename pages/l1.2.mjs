import BasePage from "./basepage.mjs";
import { By } from "selenium-webdriver";

class TodoPage extends BasePage {
  constructor(driver) {
    super(driver);
    this.driver = driver;
  }
  async open() {
    await this.driver.get('https://lambdatest.github.io/sample-todo-app/');
  }
  async getHeader() {
    return await this.driver.findElement(By.xpath('//h2')).getText();
  }
  async getTodoRemainingText() {
    return await this.driver.findElement(By.xpath('//span[contains(text(), "remaining")]')).getText();
  }
  async clickTodo(index) {
    await this.driver.findElement(By.name(`li${index}`)).click();
  }
  async addTodo(text) {
    await this.driver.findElement(By.id('sampletodotext')).sendKeys(text);
    await this.driver.findElement(By.id('addbutton')).click();
  }
}

export default TodoPage;
