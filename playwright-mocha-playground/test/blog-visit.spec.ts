import * as playwright from "playwright";
import { expect } from "chai";

let page: any;
let browser: any;
let context: any;

const BASE_URL = "https://dev.rase.blog";

describe("개발 블로그에 들어가면", () => {
    beforeEach(async () => {
        const { chromium } = playwright;
        browser = await chromium.launch({ headless: false });
        context = await browser.newContext();
        page = await context.newPage(BASE_URL);
    });

    afterEach(async function() {
        await browser.close();
    });

    it("페이지 타이틀로 irrationnelle 을 확인할 수 있다.", async () => {
        await page.goto("https://dev.rase.blog/");
        const pageTitle = await page.title();
        expect(pageTitle).to.have.string("irrationnelle");
    });
});
