import { crawlDomain } from "./src/crawler.js";

const domains = [
  "https://example1.com",
  "https://example2.com",
  "https://example3.com",
];

(async () => {
  for (const domain of domains) {
    console.log(`Starting dynamic crawl for domain: ${domain}`);
    const productURLs = await crawlDomain(domain, 3);
    console.log(`Discovered ${productURLs.length} product URLs for ${domain}`);
    console.log(productURLs);
  }
})();


