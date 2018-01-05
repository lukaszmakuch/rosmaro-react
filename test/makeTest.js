// Related to the webdriver
const {Builder, promise, By, until} = require('selenium-webdriver');
require('chromedriver');

// Settings
const settings = {
  appRootUrl: 'http://localhost:3000'
};

// Global Config
jest.setTimeout(10 * 1000);
promise.USE_PROMISE_MANAGER = false;

const helpers = (driver, settings) => {
  const waitForPresent = async (cssSelector) => await driver.wait(until.elementLocated(
    By.css(cssSelector)
  ));

  const getAttr = async (cssSelector, attr) => {
    const elem = await waitForPresent(cssSelector);
    return elem.getAttribute(attr);
  };

  const click = async (cssSelector) => {
    const clickable = await waitForPresent(cssSelector);
    await clickable.click();
  };

  return {
    click,
    getAttr
  };
};

module.exports = testCase => async() => {
  const driver = await new Builder().forBrowser('chrome').build();
  await driver.get(settings.appRootUrl);
  await testCase(helpers(driver, settings));
  driver.quit();
};