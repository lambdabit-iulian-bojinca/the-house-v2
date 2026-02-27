import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch({
        headless: "new",
        defaultViewport: { width: 1440, height: 900 },
        args: ['--no-sandbox']
    });
    const page = await browser.newPage();

    // Go to the local page
    await page.goto('file:///Users/iulian.bojinca/projects/lambdabit/the-house-v2/property.html', { waitUntil: 'networkidle0' });

    // Click the first bento cell to open the lightbox
    await page.waitForSelector('.bento-cell');
    await page.click('.bento-cell');

    // Wait for the lightbox to fade in
    await new Promise(r => setTimeout(r, 600)); // waitForTimeout is deprecated, using setTimeout

    // Take screenshot
    const outPath = '/Users/iulian.bojinca/.gemini/antigravity/brain/fa5fee29-1c9a-48aa-990a-357faab0481e/lightbox_puppeteer.png';
    await page.screenshot({ path: outPath });
    console.log(`Saved screenshot to ${outPath}`);

    await browser.close();
})();
