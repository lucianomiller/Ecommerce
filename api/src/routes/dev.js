const { Router } = require("express");
const { Category, Product } = require("../db.js");
const axios = require("axios");

const getRandomNumber = () =>
  axios
    .get("https://random-data-api.com/api/number/random_number")
    .then((response) => response.data);

const getRandomAddress = () =>
  axios
    .get("https://random-data-api.com/api/address/random_address")
    .then((response) => response.data);

const getRandomName = () =>
  axios
    .get("https://random-data-api.com/api/name/random_name")
    .then((response) => response.data);

const getRandomAppliance = () =>
  axios
    .get("https://random-data-api.com/api/appliance/random_appliance")
    .then((response) => response.data);

const getRandomHipsterStuff = () =>
  axios
    .get("https://random-data-api.com/api/hipster/random_hipster_stuff")
    .then((response) => response.data);

const router = Router();

router.post("/products", async function (req, res) {
  const { times = 1 } = req.body;
  for (let i = 0; i < times; i++) {
    const { sentence: productDescription } = await getRandomHipsterStuff();
    const { equipment: productName } = await getRandomAppliance();

    const categoriesIds = await Category.findAll().then((resp) =>
      resp.map((cat) => cat.id)
    );

    const getRandomCategoriesIdsIdx = () =>
      ~~(Math.random() * categoriesIds.length) + 1;

    let randomCategoriesIds = [];

    for (let i = 0; i < getRandomCategoriesIdsIdx(); i++) {
      randomCategoriesIds.push(categoriesIds[getRandomCategoriesIdsIdx() - 1]);
    }

    randomCategoriesIds = Array.from(new Set(randomCategoriesIds));

    const getRandomNumber = () => ~~(Math.random() * 30000);
    const getRandomNumberimg = () => ~~(Math.random() * 1500) + 1000;

    await Product.findOrCreate({
      where: {
        name: productName,
        description: productDescription,
        price: getRandomNumber(),
        stock: getRandomNumber()
      },
      defaults: {
        img: `https://picsum.photos/${getRandomNumberimg()}`
      }
    }).then(([product]) => product.setCategory(randomCategoriesIds));
  }
  res.sendStatus(200);
});

module.exports = router;
