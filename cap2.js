const puppeteer = require("puppeteer");
(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://www.tiktok.com/@elmastersalah");

  // Attendre que le captcha soit chargé
  await page.waitForSelector(".captcha_verify_container");
  await new Promise((resolve) => setTimeout(resolve, 2000));
  // Déplacer le curseur jusqu'à trouvé une autre image
  let slideIn = true;

    // Attendre que le captcha soit chargé
    await page.waitForSelector(".captcha_verify_slide--slidebar");

    // récupérer les dimensions du conteneur du slider et du slider lui-même
    const slideWrapper = await page.$(".captcha_verify_slide--slidebar");
    const slide = await page.$(".secsdk-captcha-drag-sliding");
    const slideWrapperBoundingBox = await slideWrapper.boundingBox();
    const slideBoundingBox = await slide.boundingBox();

    // déplacer le curseur à mi-chemin du slider
    const slideHandle = await page.$(".secsdk-captcha-drag-icon");
    // while (slideIn) {
    await slideHandle.hover();
    await new Promise((resolve) => setTimeout(resolve, 2000));
    await page.mouse.down();
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    await page.mouse.move(
      slideWrapperBoundingBox.x + slideWrapperBoundingBox.width / 2,
      slideBoundingBox.y + slideBoundingBox.height / 2
    );
    await page.mouse.up();
    await page.waitForSelector('.sc-htoDjs')
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // Vérifier le résultat du captcha
    slideIn = await isCaptchaValid(page);
  // }

  // Valider le captcha
  // await page.click(".captcha_verify_slide--submit");

  // await new Promise((resolve) => setTimeout(resolve, 16000));
  await browser.close();
})();

async function isCaptchaValid(page) {



  await page.waitForSelector('.sc-htoDjs')
const result = await page.evaluate(async () => {
  
  await new Promise(resolve => setTimeout(resolve, 2000));

    return resultElement.textContent.trim();
  
}, page);
// if (result!=='Loading…'){
//   loading=false;
// } 
console.log(result);
}


