# CrawlCommerce

CrawlCommerce is a web crawler designed to discover and list all product URLs across multiple e-commerce websites. This application efficiently handles diverse URL patterns, large datasets, dynamic content, and infinite scrolling. It is built using Node.js and leverages libraries like Puppeteer and Cheerio for web scraping and handling dynamic content.

## Features

- **Scalable and Efficient Crawling**: Supports crawling multiple domains with a configurable depth.
- **Dynamic Content Handling**: Uses Puppeteer to handle JavaScript-heavy websites and infinite scrolling.
- **Data Management**: Processes and stores large datasets efficiently.
- **Asynchronous Processing**: Implements parallel crawling for enhanced performance.
- **Customizable URL Patterns**: Filters product URLs based on specific patterns.
- **Extensible**: Easily add new features or customize crawling logic for specific needs.

## Prerequisites

Ensure you have the following installed on your system:

- Node.js (v16 or higher recommended)
- npm (Node Package Manager)

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/crawl-commerce.git
   cd crawl-commerce
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your configuration in `src/config.js`:
   ```javascript
   module.exports = {
       USER_AGENT: "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
       CONCURRENT_REQUESTS: 5,
       PRODUCT_PATTERNS: ["/product/", "/item/", "/p/"],
   };
   ```

## Usage

1. Start the application:
   ```bash
   node index.js
   ```

2. Modify the domains to be crawled in `index.js`:
   ```javascript
   const domains = [
       "https://example-ecommerce1.com",
       "https://example-ecommerce2.com",
   ];
   ```

3. View the discovered product URLs in the console output.

## Code Structure

- **`index.js`**: Entry point of the application, orchestrates domain crawling.
- **`src/crawler.js`**: Implements recursive domain crawling logic.
- **`src/scraper.js`**: Handles HTML scraping and product URL filtering.
- **`src/dynamicScraper.js`**: Handles dynamic content and infinite scrolling using Puppeteer.
- **`src/config.js`**: Configuration file for user-agent, concurrency limits, and URL patterns.
- **`data/`**: (Optional) Directory for storing crawled data.

## Example Workflow

1. The crawler begins with the specified domains.
2. For each domain:
   - Static HTML is fetched using Axios.
   - Dynamic content is fetched using Puppeteer.
   - Links are extracted and filtered based on patterns.
   - Recursively crawls child links up to the specified depth.
3. Outputs a consolidated list of product URLs mapped to their respective domains.

## Handling Dynamic Content and Infinite Scrolling

The `dynamicScraper.js` module uses Puppeteer to:

- Load JavaScript-heavy pages.
- Scroll incrementally to load additional content.
- Extract the fully rendered HTML for further processing.

## Error Handling

- Implements retry logic for transient network issues.
- Logs errors without disrupting the crawling process.
- Handles edge cases like circular links and unreachable pages.

## Dependencies

- [Puppeteer](https://pptr.dev/) - For handling dynamic content.
- [Cheerio](https://cheerio.js.org/) - For HTML parsing and scraping.
- [Axios](https://axios-http.com/) - For HTTP requests.
- [p-limit](https://www.npmjs.com/package/p-limit) - For managing concurrent requests.

## Future Enhancements

- **Distributed Crawling**: Scale across multiple machines for very large datasets.
- **Database Integration**: Store crawled data in a database for persistent storage.
- **GUI Dashboard**: Visualize crawling progress and results in real-time.
- **Advanced Filtering**: Support for regex-based or AI-enhanced URL filtering.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Submit a pull request with detailed explanations of your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For questions or feedback, feel free to reach out:

- Email: your-email@example.com
- GitHub: [your-username](https://github.com/your-username)

---

Thank you for using CrawlCommerce! Happy Crawling! 🚀

