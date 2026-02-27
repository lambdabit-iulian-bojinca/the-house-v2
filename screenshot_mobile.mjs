import puppeteer from 'puppeteer-core';
import { execSync } from 'child_process';
import path from 'path';

// Get Chrome path dynamically for Mac
const getChromePath = () => {
    try {
        return execSync('/Applications/Google\\ Chrome.app/Contents/MacOS/Google\\ Chrome --version').toString() ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' : null;
    } catch {
        return null; // Fallback to Chromium if needed, not recommended
    }
};

(async () => {
    const __dirname = path.resolve();
    const browser = await puppeteer.launch({
        executablePath: getChromePath(),
        headless: "new"
    });
    const page = await browser.newPage();

    // Set viewport to mobile standard (iPhone 12/13 Pro)
    await page.setViewport({
        width: 390,
        height: 844,
        deviceScaleFactor: 2,
        isMobile: true,
        hasTouch: true,
        isLandscape: false
    });

    const basePath = '/Users/iulian.bojinca/.gemini/antigravity/brain/fa5fee29-1c9a-48aa-990a-357faab0481e/';

    const urls = [
        { url: `file://${__dirname}/index.html`, path: 'mobile_index.png' },
        { url: `file://${__dirname}/listings.html`, path: 'mobile_listings.png' },
        { url: `file://${__dirname}/property.html`, path: 'mobile_property.png' }
    ];

    for (const { url, path: filename } of urls) {
        await page.goto(url, { waitUntil: 'networkidle0' });
        await page.screenshot({ path: `${basePath}${filename}`, fullPage: true });
        console.log(`Saved screenshot to ${filename}`);
    }

    await browser.close();
})();
