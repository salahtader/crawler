const TikTokScraper = require('tiktok-scraper');

(async () => {
  try {
    const posts = await TikTokScraper.user('elmastersalah');
    console.log(posts);
  } catch (error) {
    console.log(error);
  }
})();
