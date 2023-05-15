const puppeteer = require('puppeteer');
const randomUseragent = require('random-useragent');
const fs = require('fs');
const { promisify } = require('util');

const writeFileAsync = promisify(fs.writeFile);

const url = 'https://www.tiktok.com/foryou';
const userAgentList = [
  'Chrome',
  'Firefox',
  'Safari',
  'Opera',
  'Edge',
  'Internet Explorer',
];

async function scrape() {
  
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setUserAgent(randomUseragent.getRandom(userAgentList));
  await page.goto(url, { waitUntil: 'networkidle2' });
    
  const title = await page.title();
  console.log(title);
  await page.screenshot({ path: `screenshot_${new Date().getTime()}.png`, fullPage: true });
  await writeFileAsync('output.txt', title);
  
  // Scroll 20% down
  await page.evaluate('window.scrollTo(0, window.scrollY + window.innerHeight * 0.2)');
  await new Promise(resolve => setTimeout(resolve, 3000));
  //   console.log(videos);
    // const videoElements = document.querySelectorAll('div.video-feed-item-wrapper');
//   await writeFileAsync('output.txt', videos);
  
  // Scroll 20% down
  // await page.evaluate('window.scrollTo(0, window.scrollY + window.innerHeight )');
  // await new Promise(resolve => setTimeout(resolve, 2000));
//   await page.evaluate('window.scrollTo(0, window.scrollY + window.innerHeight * 0.9)');
//   await page.screenshot({ path: `screenshot_${new Date().getTime()}.png`, fullPage: true });
//   await new Promise(resolve => setTimeout(resolve, 3000));
//   await page.evaluate('window.scrollTo(0, window.scrollY + window.innerHeight * 0.9)');
//   await page.screenshot({ path: `screenshot_${new Date().getTime()}.png`, fullPage: true });
//   await new Promise(resolve => setTimeout(resolve, 1000));
//   await page.evaluate('window.scrollTo(0, window.scrollY + window.innerHeight * 0.9)');
//   await page.screenshot({ path: `screenshot_${new Date().getTime()}.png`, fullPage: true });
//   await new Promise(resolve => setTimeout(resolve, 2500));
;
  await browser.close();
}

(async () => {
   
  for (let i = 0; i < ; i++) {
    await scrape();
    console.log(`Scraped ${i + 1} times`);
  }
})();
