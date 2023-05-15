const puppeteer = require('puppeteer');

const randomUseragent = require('random-useragent');
const fs = require('fs');
const { promisify } = require('util');

const writeFileAsync = promisify(fs.writeFile);

const url = 'https://www.tiktok.com/@miri_el2';
const userAgentList = [
  'Chrome',
  'Firefox',
  'Safari',
  'Opera',
  'Edge', 
  'Internet Explorer',
];

async function scrape() {
  
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.setUserAgent(randomUseragent.getRandom(userAgentList));
  await page.goto(url, { waitUntil: 'networkidle2' });
  await page.waitForNavigation()
  await page.screenshot({ path: `screenshot/screenshot_${new Date().getTime()}.png`, fullPage: true });
  const count = await page.$$eval(`div[class*="DivOneColumnContainer"]  [class*="DivItemContainer"] `, els => els.length);

console.log(count);
if (count) {
  try{
const items = await page.$$eval(`div[class*="DivOneColumnContainer"] [class*="DivItemContainer"]`, els => {
  return els.slice(0, els.length).map(el => {
   el ? (el.scrollIntoView()*0.5 , el.click()) : new Promise(resolve => setTimeout(resolve, 3000))
    const titleEl = el.querySelector('[class*="DivContentContainer"] [class*="DivTextInfoContainer"] span[class*="SpanText"]');
    const title = titleEl ? titleEl.textContent : null;
    const AuthorEl = el.querySelector('h3[class*="H3AuthorTitle"]');
    const Author = AuthorEl ? AuthorEl.textContent : null; 
    const ImgAuthorElAvatar = el.querySelector('img[class*="ImgAvatar"]');
    const ImgAuthorAvatar = ImgAuthorElAvatar ? ImgAuthorElAvatar.getAttribute("src") : null;
    const imgSrcEl = el.querySelector('img[class*="ImgPoster"]');
   
    const imgSrc = imgSrcEl ? 
        (imgSrcEl.getAttribute('src') ): null;
       
         new Promise(resolve => setTimeout(resolve, 2000));
    const videoContainer = el.querySelector(
      'div[class*="DivBasicPlayerWrapper"]'
    );
    const videoSrc = 
    videoContainer ? (
      videoContainer.getElementsByTagName("video")[0].getAttribute('src')

      ):null
    // console.log('vid '+ videoSrc);
    // const videoSrc = video ?   video.getAttribute("src"): null;
    // const  =

    

    // const desc = el.querySelector('div[class*="DivDescriptionContainer"]').textContent.trim();
    // const username = el.querySelector('a[class*="DivUserContainer"] span').textContent.trim();
    return { title,imgSrc,Author,ImgAuthorAvatar ,videoSrc}; //, imgSrc, desc, username
  });
});
console.log(items);
}catch(e){
  console.log(e);
}}
  // Sélectionner tous les éléments de la liste des vidéos
  // const videoList = await page.$$('.DivOneColumnContainer');

  // // Parcourir la liste des vidéos et extraire les informations souhaitées
  // for (let i = 0; i < 6; i++) {
  //   const video = videoList[i];

  //   // Extraire le nom d'utilisateur
  //   const username = await video.$eval('.video-feed-item-username', n => n.textContent.trim());

  //   // Extraire le titre de la vidéo
  //   const title = await video.$eval('.video-feed-item-title', n => n.textContent.trim());

  //   // Extraire le nombre de "J'aime"
  //   const likes = await video.$eval('.video-feed-item-info > .video-feed-item-likes', n => n.textContent.trim());

  //   // Extraire le nombre de commentaires
  //   const comments = await video.$eval('.video-feed-item-info > .video-feed-item-comments', n => n.textContent.trim());

  //   // Afficher les informations extraites dans la console
  //   console.log(`Username: ${username}\nTitle: ${title}\nLikes: ${likes}\nComments: ${comments}\n`);
  // }
await new Promise(resolve => setTimeout(resolve, 2500));
  await browser.close();
}

(async () => {
   
  for (let i = 0; i < 2; i++) {
    await scrape();
    console.log(`Scraped ${i + 1} times`);
  }
})();
