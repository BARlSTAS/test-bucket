import { chromium, firefox, webkit } from "playwright";

(async () => {
    const browsers = [chromium, firefox, webkit];
    for (const browserType of browsers) {
        const browser = await browserType.launch();
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto("https://dev.rase.blog/");
        await page.screenshot({ path: `example-${browserType.name()}.png` });
        await browser.close();
    }
})();
