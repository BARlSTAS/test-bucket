const assert = require('assert');
const puppeteer = require('puppeteer'); 
const opts = {headless: false} 

describe('my app', function() {
this.timeout(10000);

  let browser;
  let page;
  let server;

  before(async function() { 
    // this.timeout(10000);
    // Create an Express static server that will serve up `index.html` at
    // `http://localhost:3000/index.html`
    const app = require('express')();
    app.use(require('express-static')('.'));
    server = await app.listen(3001);

    // Launch Puppeteer and navigate to the Express server
    browser = await puppeteer.launch(opts);
    page = await browser.newPage();
    await page.goto('http://localhost:3001/index.html'); 
  });

  after(async function() {
    await browser.close();
    await server.close();
  });

  it('h1 should say "mocha is good"', async function() {  
    const tag = 'h1'; 
    await page.waitFor(tag); 
    const heading = await page.$eval(tag, heading => heading.innerText);
    await page.click("a");
    await page.waitFor(tag); 
    const next = await page.$eval(tag, next => next.innerText);
    await page.screenshot({path: 'level07.png'});
    
    assert.equal(heading, 'Mocha is good') 
    assert.equal(next, 'NEXT!')
  }); 
});