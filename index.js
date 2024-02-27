const fs = require('fs');
const puppeteer = require('puppeteer');

async function run() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://stevens.com.pa/caballero/accesorios.html');


  // Get items using $$eval
  const items = await page.$$eval('.product-item-info',(elements) =>
    elements.map((e) => ({
      title: e.querySelector('.product-item-name a').innerText,
      brand: e.querySelector('.product-item-brand').innerText,
      img: e.querySelector('.product-image-wrapper img.product-image-photo ').src,
      price: e.querySelector('.price').innerText
    }))
  );

  console.log(items);

  // Save data to JSON file
  fs.writeFile('items.json', JSON.stringify(items), (err) => {
    if (err) throw err;
    console.log('File saved');
  });

  await browser.close();
}

run();
