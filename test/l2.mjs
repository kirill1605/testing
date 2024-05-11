import BasePage from "../pages/basepage.mjs";
import SchedulePage from "../pages/l2.mjs";
import { expect } from 'chai';
import { Builder, Browser, By } from 'selenium-webdriver';
import { writeFile } from 'fs';
import { promisify } from 'util';
const writeFileAsync = promisify(writeFile);

describe('Schedule Page Test', () => {
    let driver;
    let basePage;
    let schedulePage;
    before(async () => {
        driver = await new Builder().forBrowser(Browser.CHROME).build();
        basePage = new BasePage(driver);
        schedulePage = new SchedulePage(driver);
    });

    after(async () => {
        await driver.quit();
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
    it('Search for a group schedule', async () => {
        await basePage.open();
        await basePage.clickSchedule();
        const header = await basePage.getTitle();
        expect(header).to.equal('Расписания');
        await basePage.clickSeeOnWebsite();
        await basePage.checkTabs();
        await schedulePage.checkGroups();
        await schedulePage.clickGroup();
        const weekdays = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
        const now = new Date();
        const weekdayIndex = now.getDay() - 1;
        const result = await schedulePage.checkColor();
        assert.strictEqual(result[0], weekdays[weekdayIndex]);
    });
});



