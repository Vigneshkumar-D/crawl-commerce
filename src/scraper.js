import path from "path";
import axios from "axios";
import * as cheerio from "cheerio";
import puppeteer from "puppeteer";
import isValidURL from "./utils.js";
import { PRODUCT_PATTERNS, USER_AGENT } from "./config.js";


const fetchHTML = async (url) => {
  const { data } = await axios.get(url, {
    headers: { "User-Agent": USER_AGENT },
  });
  return cheerio.load(data);
};

const scrapeLinks = ($, domain) => {
  const links = [];
  $("a[href]").each((_, element) => {
    const href = $(element).attr("href");
    if (isValidURL(href, domain)) {
      links.push(new URL(href, domain).toString());
    }
  });
  return links;
};

const filterProductURLs = (urls) => {
  return urls.filter((url) => PRODUCT_PATTERNS.some((pattern) => url.includes(pattern)));
};

const fetchDynamicContent = async (url) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle2" });
  const content = await page.content();
  await browser.close();
  return cheerio.load(content);
};

export { fetchHTML, scrapeLinks, filterProductURLs, fetchDynamicContent };

