const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  const videoUrlP = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'; // URL de la vidéo à extraire
  await page.goto(videoUrlP);

  // Titre de la vidéo
  const title = await page.$eval('#container > h1 > yt-formatted-string', el => el.innerText);

  // Description de la vidéo
  const description = await page.$eval('#description > yt-formatted-string', el => el.innerText);

  // Lien de l'image de la vidéo
  const thumbnailUrl = await page.$eval('#thumbnail > img', el => el.src);

  // Lien de la vidéo
  const videoUrl = await page.$eval('#player > div.video-container > video', el => el.src);

  // Nombre de j'aime
  const likeCount = await page.$eval('#top-level-buttons > ytd-toggle-button-renderer:nth-child(1) > a > yt-formatted-string', el => el.innerText);

  // Nombre de commentaires
  const commentCount = await page.$eval('#count > yt-formatted-string', el => el.innerText);

  console.log({
    title,
    description,
    thumbnailUrl,
    videoUrl,
    likeCount,
    commentCount
  });

  await browser.close();
})();
