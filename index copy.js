const express = require('express');

const http = require('http');

// const TikTokAPI = require('tiktok-api');

const app = express();

const puppeteer = require('puppeteer');

const fetch = require('node-fetch');
const util = require('util');
const getExceptionMessage = error => error.message + "\n" + error.stack;

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.tiktok.com/tag/cats');

  const videos = await page.evaluate(async (fetch) => {
    const results = [];

    const videoElements = document.querySelectorAll('div.video-feed-item-wrapper');

    for (const video of videoElements) {
        const title = video.querySelector('a.jsx-3848259080.video-feed-item-title').textContent;
        const url = video.querySelector('a.jsx-3848259080.video-feed-item-wrapper').href;

      const response = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      const html = await response.text();

      const matches = html.match(/"video":{"id":"(.+?)"/);

      if (matches && matches[1]) {
        const videoId = matches[1];
        const videoUrl = `https://www.tiktok.com/@tiktok/video/${videoId}`;
        results.push({ title, url: videoUrl });
      }
    }

    return results;
  }, fetch).catch((error) => {
    throw new Error('Evaluation failed: ' + getExceptionMessage(error));
  });

  console.log(videos);

  await browser.close();
})();








app.get('/', function (req, res) {
    scrapeTikTok();
    res.send("hello")
});


const port = process.env.PORT || '8080';

app.set('port', port);
const server = http.createServer(app);
server.listen(port);
server.on('listening', () => {
    console.log('Listening on ' + (port));
});
