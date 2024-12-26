import { fetchDynamicContent } from "./dynamicScraper.js";
import { scrapeLinks, filterProductURLs } from "./scraper.js";

async function crawlDomain(domain, maxDepth = 5, visited = new Set(), depth = 0) {
  if (depth > maxDepth) return [];
  visited.add(domain);

  console.log(`Crawling: ${domain}, Depth: ${depth}`);

  let html;
  try {
    html = await fetchDynamicContent(domain);
  } catch (error) {
    console.error(`Failed to fetch dynamic content for ${domain}:`, error);
    return [];
  }

  const links = scrapeLinks(html, domain);
  const productURLs = filterProductURLs(links);

  const childLinks = links.filter((link) => !visited.has(link));
  const childCrawls = childLinks.map((link) =>
    crawlDomain(link, maxDepth, visited, depth + 1)
  );

  const childProductURLs = (await Promise.all(childCrawls)).flat();
  return [...productURLs, ...childProductURLs];
}

export { crawlDomain };
