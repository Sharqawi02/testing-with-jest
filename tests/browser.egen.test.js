const { Builder, By } = require('selenium-webdriver');
require('geckodriver');

const fileUnderTest = 'file://' +
  __dirname
    .replaceAll(/ /g, '%20')
    .replaceAll(/\\/g, '/') +
  '/../dist/index.html';

jest.setTimeout(1000 * 60 * 2); 

let driver;

beforeAll(async () => {
  driver = await new Builder().forBrowser('firefox').build();
  await driver.get(fileUnderTest);
});

afterAll(async () => {
  await driver.quit();
});

test('Efter att ha pushat ett värde ska display uppdateras', async () => {
  // Klicka på "Pusha till stacken" och fyll i prompt
  const pushBtn = await driver.findElement(By.id('push'));
  await pushBtn.click();

  const prompt = await driver.switchTo().alert();
  await prompt.sendKeys('Test');
  await prompt.accept();


  const topText = await driver.findElement(By.id('top_of_stack')).getText();
  expect(topText).toBe('Test');
});

test('Pop visar alert med rätt text', async () => {
  const peekBtn = await driver.findElement(By.id('peek'));
  await peekBtn.click();  
  const initial = await driver.findElement(By.id('top_of_stack')).getText();



  // Nu testar vi pop
  const popBtn = await driver.findElement(By.id('pop'));
  await popBtn.click();
  const alert = await driver.switchTo().alert();
  const text = await alert.getText();
  expect(text).toMatch(/Tog bort Test/);
  await alert.accept();
});
