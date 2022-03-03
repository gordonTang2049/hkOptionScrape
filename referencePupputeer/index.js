const puppeteer = require('puppeteer')
const ObjectsToCsv = require('objects-to-csv')

function truncateString(str, num) {
  if (str.length <= num) {
    return str
  }
  return str.slice(0, num) + '.'
}

const automation = async () => {
  const data = []
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  const condition = 17

  let pageNo = 0
  let i = 0

  while (i < condition) {

    await page.goto(
      `https://careers.ey.com/ey/search/?q=&locationsearch=australia&startrow=${pageNo}`
    )
    const container = await page.$$('.data-row')

    for (const iterator of container) {

      const title = await iterator.$eval(
        
        'td.colTitle > span > a',
        (el) => el.textContent

      )

      const Link = await iterator.$eval('td.colTitle > span > a', (el) =>
        el.getAttribute('href')
      )

      const formatedLink = `https://careers.ey.com/${Link}`

      const Location = await iterator.$eval(
        'td.colLocation.hidden-phone span',
        (el) => el.textContent.replace('/\n/', '').trim()
      )

      const formatedLoaction = truncateString(Location, 20)
      data.push({ title, Link: formatedLink, Location: formatedLoaction })
    }

    i++
    pageNo += 25
  }

  const csv = new ObjectsToCsv(data)

  const _date = Math.floor(Math.random() * 500)

  await csv.toDisk(`./data${_date}.csv`)
  await browser.close()
}

automation()
