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

  const firstBarHandlers = await page.$$("#slider-range > span");
  const firstBarRange = await page.$("#slider-range > div");

  await firstBarHandlers[0].evaluate((el) => (el.style.left = 0 + "%"));
  await firstBarHandlers[1].evaluate((el) => (el.style.left = 100 + "%"));

  await firstBarRange.evaluate((el) => {
    el.style.left = 0 + "%";
    el.style.width = 100 + "%";
  });

  const secondBarHandlers = await page.$$("#slider-range2 > span");
  const secondBarRange = await page.$("#slider-range2 > div");

  await secondBarHandlers[0].evaluate((el) => (el.style.left = 0 + "%"));
  await secondBarHandlers[1].evaluate((el) => (el.style.left = 100 + "%"));

  await secondBarRange.evaluate((el) => {
    el.style.left = 0 + "%";
    el.style.width = 100 + "%";
  });

  const searchBtn = await page.$("#btn_search");

  await searchBtn.evaluate((btn) => btn.click());

  await sleep(2000)

  const rows = await page.$$(
    "table.table.fixed-freeze-tb-container.alttable.stickysort-header-table.sticky-enabled > tbody > tr"
    );
  
  
  for (let row of rows) {

    const data = await row.$(".btn_detail");

    const link = await data.evaluate((el) => el.getAttribute("href"));
    
    // console.log(link)
    // console.log(data);
  }

  const numPage = await page.$$("li.page-number")
  
  
  // const form = await page.$('a#topbar-search');
  // await form.evaluate( form => form.click() );
  // await page.$eval( 'a#topbar-search', form => form.click() );


  await page.setViewport({
    width: 1200,
    height: 1200,
  });

  await page.screenshot({
    path: "./screenshots/pic.png",
  });

  await page.close();
  await browser.close();
};

const main = () => {
  const url =
    "https://www.hkex.com.hk/eng/sorc/options/stock_options_search.aspx";

  try {
    fetchData(url);
  } catch (e) {
    console.log(e);
  }
};

main();
