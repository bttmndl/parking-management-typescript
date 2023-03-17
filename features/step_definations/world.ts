import { Builder, WebDriver } from 'selenium-webdriver';

export let driver: WebDriver;

export async function startDriver() {
  driver = await new Builder().forBrowser('chrome').build();
}

export async function stopDriver() {
  await driver.quit();
}
