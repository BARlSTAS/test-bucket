import * playwright from 'playwright';
import assert from 'assert';

let page, browser, context

describe("개발 블로그에 들어가면", () => {
    beforeEach(async () => {
        const {chromium} = playwright;
        browser = await chromium.launch({ headless: false })
        context = await browser.newContext()
        page = await context.newPage(BASE_URL)
    })

    afterEach(async function() {
        await page.screenshot({ path: `${this.currentTest.title.replace(/\s+/g, '_')}.png` })
        await browser.close()
    })

    it("페이지 타이틀로 irrationnelle 을 확인할 수 있다.", () => {
          await page.goto('https://dev.rase.blog/');
          assert.equal(await page.title(), 'irrationnelle');
    })
})
