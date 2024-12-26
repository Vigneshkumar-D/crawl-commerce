import puppeteer from "puppeteer";

async function fetchDynamicContent(url, maxScrolls = 10, scrollDelay = 1000) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: "networkidle2" });

    for (let i = 0; i < maxScrolls; i++) {
      await page.evaluate(() => {
        window.scrollBy(0, window.innerHeight);
      });

      await page.waitForTimeout(scrollDelay);

      const hasMoreContent = await page.evaluate(() => {
        const scrollableHeight = document.documentElement.scrollHeight;
        const scrolledHeight = window.scrollY + window.innerHeight;
        return scrolledHeight < scrollableHeight;
      });

      if (!hasMoreContent) break;
    }

    const content = await page.content();
    await browser.close();
    return content;
  } catch (error) {
    console.error(`Error fetching dynamic content from ${url}:`, error);
    await browser.close();
    throw error;
  }
}

export { fetchDynamicContent };
