const { Router } = require("express");
const { Category, Product } = require("../db.js");
const router = Router();

/******************************

/products/category/...

POST / - crea una categoria con el nombre y description de req.body

GET / - trae todas las categorias
GET /:categoryName Trae todos los productos cuales pertenecen a :categoryName

DELETE /:id borra la categoria con ese :id

PUT /:id - updatea la categoria con ese :id

******************************/

// Crea una categoria
router.post("/", function (req, res) {
  const { name } = req.body;

  Category.findOrCreate({
    where: {
      name: name.toLowerCase(),
    },
  })
    .then((cat) => res.send(cat))
    .catch((err) => res.status(400).json(err));
});

// Trae todas las categorias
router.get("/", (req, res) => {
  Category.findAll().then((resp) => {
    if (resp === null) return res.json([]);
    const categories = resp.map((cat) => {
      return {
        id: cat.id,
        name: cat.name,
      };
    });

    const categoriesSortedAlphabetically = categories.sort((cat, nextCat) => {
      let fa = cat.name.toLowerCase(),
        fb = nextCat.name.toLowerCase();

      if (fa < fb) {
        return -1;
      }
      if (fa > fb) {
        return 1;
      }
    });

    res.json(categoriesSortedAlphabetically);
  });
});

// Trae todos los productos cuales pertenecen a :categoryName
router.get("/:categoryName", (req, res) => {
  const { categoryName } = req.params;

  Product.findAll({
    include: [
      { model: Category, as: "category", where: { name: categoryName } },
    ],
  }).then((resp) => {
    if (resp === null) return res.sendStatus(400);
    res.json(resp);
  });
});

// Trae una categoria
router.get("/edit/:id", function (req, res) {
  const id = req.params.id;
  Category.findOne({
    where: { id },
  })
    .then((categoria) => res.json(categoria))
    .catch((err) => res.status(400).json("Categoría no encontrada"));
});

// Borra una categoria
router.delete("/:id", function (req, res) {
  Category.destroy({
    where: { id: req.params.id },
  })
    .then(() => res.sendStatus(200))
    .catch((err) => res.status(400).json("Categoría no encontrada"));
});

// Updatea una categoria
router.put("/:id", (req, res) => {
  const { id } = req.params;
  if (!id || Number.isNaN(id)) return res.sendStatus(400);

  const { name } = req.body;
  if (!name) return res.sendStatus(400);

  return Category.update(
    { name },
    { where: { id }, returning: true, plain: true }
  ).then((resp) => res.json(resp[1]));
});

module.exports = router;
