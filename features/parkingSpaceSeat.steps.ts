import { Given, When, Then } from 'cucumber';
import { expect } from 'chai';
import { By, Key } from 'selenium-webdriver';
import { driver } from './step_definations/world';

Given('I am on the parking space seat page', async function () {
  await driver.get('http://localhost:3000/parkingSpaceSeat');
});

When('I enter the vehicle details', async function () {
  const input = await driver.findElement(By.className('input'));
  await input.sendKeys('ABCD1234');

  const dateInput = await driver.findElement(By.className('date-picker'));
  await dateInput.sendKeys('2022-03-15');

  const timeInput = await driver.findElement(By.className('time-picker'));
  await timeInput.sendKeys('12:00');
});

When('I select a parking seat', async function () {
  const parkingSeats = await driver.findElements(By.className('parking-seat'));
  await parkingSeats[0].click();
});

When('I submit the form', async function () {
  const button = await driver.findElement(By.className('button'));
  await button.click();
});

Then('the parking seat should be booked', async function () {
  const parkingSeats = await driver.findElements(By.className('parking-seat'));
  const className = await parkingSeats[0].getAttribute('class');
  expect(className).to.include('whitesmoke');
});

When('I select a booked parking seat', async function () {
  const parkingSeats = await driver.findElements(By.className('parking-seat'));
  await parkingSeats[0].click();
});

Then('the parking seat should be deallocated', async function () {
  const parkingSeats = await driver.findElements(By.className('parking-seat'));
  const className = await parkingSeats[0].getAttribute('class');
  expect(className).to.include('grey');
});
