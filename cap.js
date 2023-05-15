const puppeteer = require('puppeteer');
const fs = require('fs');
const { promisify } = require('util');


const writeFileAsync = promisify(fs.writeFile);

(async () => {
    const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto('https://www.tiktok.com/@elmastersalah');


  // Attendre que le captcha soit chargé
  await page.waitForSelector('.captcha_verify_container');

  // Capturer les deux images est les sauvhardé
//   const image1 = await page.$('.sc-fjdhpX');
//   const image2 = await page.$('.sc-cSHVUG');


  // Capturer les tous les images PNG est les sauvhardé dans le dossier Imagecaptcha
//   const images = await page.$$eval('img', imgs => imgs.map(img => img.src));

//   for (let i = 0; i < images.length; i++) {
//     const image = images[i];
//     if (image.endsWith('.png')) {
//       const viewSource = await page.goto(image);
//       const buffer = await viewSource.buffer();
//       const filename = `./Imagecaptcha/image-${i}.png`;
//       fs.writeFile(filename, buffer, () => console.log(`${filename} saved.`));
//     }
//   }


  // Envoyer les données des images à un service de reconnaissance d'images
//   const result = await recognizeCaptcha(image1Data, image2Data);



  // Déplacer le slider jusqu'à trouvé une autre image                2-ce que le résultat soit validé

//mileu
// attendre que le captcha soit chargé
await page.waitForSelector('.captcha_verify_slide--slidebar');

// récupérer les dimensions du conteneur du slider et du slider lui-même
const slideWrapper = await page.$('.captcha_verify_slide--slidebar');


const slide = await page.$('.secsdk-captcha-drag-sliding');
const slideWrapperBoundingBox = await slideWrapper.boundingBox();
console.log(slideWrapperBoundingBox);
const slideBoundingBox = await slide.boundingBox();

// déplacer le curseur à mi-chemin du slider
const slideHandle = await page.$('.secsdk-captcha-drag-icon');
await slideHandle.hover();
await new Promise(resolve => setTimeout(resolve, 2000));
await page.mouse.down();
await new Promise(resolve => setTimeout(resolve, 1000));
await page.mouse.move(
  slideWrapperBoundingBox.x + slideWrapperBoundingBox.width/2 ,
  slideBoundingBox.y + slideBoundingBox.height / 2
);
// await new Promise(resolve => setTimeout(resolve, 1000));
// const textinfor = await page.$('').getValue();


// await page.mouse.click();

await page.mouse.up();

await page.waitForSelector('.sc-htoDjs')
await new Promise(resolve => setTimeout(resolve, 1000));
const result = await page.evaluate(() => {
  
  const resultElement = document.querySelector('.sc-htoDjs');
  if (resultElement) {
    return resultElement.textContent.trim();
  } else {
    return "Verification failed";
  }
}, page);

console.log(result);
// await new Promise(resolve => setTimeout(resolve, 10000000000000000000000000000000000000000000000));


//   let slider = await page.$('.react-draggable');
//   while (!result.isValid) {
    // Déplacer le slider d'une certaine distance
    // await slider.hover();
    // await slider.mouse.down();
    // await slider.mouse.dragAndDrop(100, 0, { delay: 1000, });
    // await slider.mouse.up();
//   }

//     // Capturer les nouvelles images
//     const image1 = await page.$('#captcha img:first-of-type');
//     const image2 = await page.$('#captcha img:last-of-type');
//     const image1Data = await image1.screenshot({ encoding: 'base64' });
//     const image2Data = await image2.screenshot({ encoding: 'base64' });

//     // Réessayer la reconnaissance d'images
//     result = await recognizeCaptcha(image1Data, image2Data);
//   }

//   // Valider le captcha
//   await page.click('#captcha-submit');

await new Promise(resolve => setTimeout(resolve, 16000));
//   await browser.close();
})();

async function recognizeCaptcha(image1Data, image2Data) {
  // Envoyer les données des images à un service de reconnaissance d'images
  const result = await fetch('https://example.com/recognition', {
    method: 'POST',
    body: JSON.stringify({
      image1: image1Data,
      image2: image2Data
    })
  }).then(response => response.json());

  return result;
}
