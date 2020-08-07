const assert = require('assert');
const puppeteer = require('puppeteer');

const opts = { headless: false, slowMo: 250 };

describe('my app', function() {
  let browser;
  let page;
  let server;

  before(async function() {
    this.timeout(10000);
    // Create an Express static server that will serve up `index.html` at
    // `http://localhost:3000/index.html`
    const app = require('express')();
    app.use(require('express-static')('.'));
    server = await app.listen(3002);

    // Launch Puppeteer and navigate to the Express server
    browser = await puppeteer.launch(opts);
    page = await browser.newPage();
    await page.goto('http://localhost:3002/src/level09.html');
  });

  after(async function() {
    await browser.close();
    await server.close();
  });

  it('리액트 스테이트 변경하기', async function() {
    this.timeout(10000);
    await page.waitFor('[data-commentid="1"]', {visible: true, timeout: 2000}); 
    // change state by click
    await page.evaluate(() => document.querySelector('[data-commentid="1"]').firstElementChild.click());
    const content= await page.evaluate(() => document.querySelector('[data-commentid="1"]').innerHTML);
    assert.equal(content, 'You liked comment number 1')
    await page.waitFor(1000)
  });
});