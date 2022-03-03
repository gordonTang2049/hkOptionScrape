const puppeteer = require("puppeteer");
const ObjectsToCsv = require("objects-to-csv");

const sleep = (time) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};

const fetchData = async (URL) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(URL);

  await page.screenshot({
    path: "./screenshots/pic1.png",
  });

  await page.close();
  await browser.close();
};

const main = () => {
  const url = "https://www.hkex.com.hk/eng/sorc/options/stock_options_search.aspx"

  fetchData(url);
};

main();
