const server = require("express").Router();
const { Op } = require("sequelize");
const {
  Product,
  Category,
  productByCategories,
  Review,
  User,
  Orden,
  conn: sequelize
} = require("../db.js");
const categoryRouter = require("./category.js");

// /products/category/...
server.use("/category", categoryRouter);

// para ver los metodos de asociación
// console.log(Object.getPrototypeOf(MODEL_INSTANCE));

/***********************************

/products/...

GET / - todos los productos
GET /search?name="martillo" - todos los productos cuales
    el 'name' es parte del nombre
GET /:id - producto cual el :id es su id

POST / - crea un producto y le asigna las categorias, todo del req.body
POST /:idProducto/category/:idCategoria - le da una categoria al producto

PUT /:id - updeatea un producto

DELETE /:id - borra un producto
DELETE /:idProducto/category/:idCategoria - borra la relacion categoria/producto
DELETE /:idProducto/all - borra todas las relaciones de un producto y sus categorias

***********************************/
var isLoggedIn = function (req, res, next) {
  if (req.user) return next();
  res.sendStatus(401);
};

// Trae todos los productos
server.get("/", (req, res) => {
  Product.findAll({ include: [{ model: Category, as: "category" }] })
    .then((products) => {
      res.json(products);
    })
    .catch(() => res.json(error));
});

// Trae todos los productos que son like el query 'name' [Op.like]: `%${string}%`
server.get("/search", async (req, res) => {
  const {
    categories,
    name = "",
    from = 0,
    limit = 40,
    min = 0,
    max
  } = req.query;
  const categs = categories && categories.split(",");
  if (isNaN(min) && isNaN(max) && max < min) return res.sendStatus(400);
  if (name.length === 1)
    return res
      .status(400)
      .json("La busqueda tiene que ser mas larga que una letra");
  if (!name && !categs) return res.sendStatus(400);

  const searchQuery = {
    where: { name: { [Op.iLike]: `%${name}%` }, price: { [Op.gte]: min } },
    include: [
      {
        model: Category,
        as: "category"
      }
    ],
    limit: limit,
    offset: from,
    order: [["name", "ASC"]]
  };

  const total = {
    where: { name: { [Op.iLike]: `%${name}%` }, price: { [Op.gte]: min } },
    include: [
      {
        model: Category,
        as: "category"
      }
    ],
    order: [["name", "ASC"]]
  };

  if (categs) total.include[0].where = { name: { [Op.in]: categs } };

  maxIsANumberAndValid = !isNaN(max) && +max > +min;
  if (maxIsANumberAndValid) searchQuery.where.price[Op.lte] = max;

  const searchRes = await Product.findAll(searchQuery);
  const totalProds = await Product.findAll(total);

  const [resul] = await sequelize.query(
    `SELECT
      max(price) as "maxPriceOfAllProds"
     FROM
      products
    `
  );

  const maxPriceOfAll = +resul[0].maxPriceOfAllProds;

  const paginationQueries = [];

  if (searchRes.length) {
    for (let i = 0; i <= totalProds.length; i += +limit) {
      const query = new URLSearchParams({ name, from: i, limit, min });
      categs && query.set("categories", categs);
      max && query.set("max", max);
      paginationQueries.push(query.toString());
    }
  }

  res.json({
    products: searchRes,
    maxPriceOfAll,
    totalProds: searchRes.length,
    paginationQueries
  });
});

server.get("/newest", (req, res) => {
  const { limit = 12 } = req.query;
  // if (["ASC", "DESC"])
  Product.findAll({
    include: [{ model: Review, as: "reviews" }],
    limit,
    order: [["createdAt", "DESC"]]
  }).then((resp) => res.json(resp));
});

//Trae todos los reviews
server.get("/review", (req, res) => {
  const allReviews = [];

  Review.findAll({
    include: [{ model: User }]
  })
    .then((resp) => {
      resp.map((revi) => {
        allReviews.push({
          id: revi.id,
          authorId: revi.userId,
          content: revi.description,
          score: +revi.score,
          author: revi.user.firstName + " " + revi.user.lastName,
          createdAt: revi.createdAt,
          productId: revi.productId
        });
      });
      res.status(200).json(allReviews);
    })
    .catch((e) => res.status(400).json(e));
});

// Se fija si compro ya ese producto
server.get("/hasBought/:productId", isLoggedIn, (req, res) => {
  const { productId } = req.params;
  Orden.findOne({
    where: {
      userId: req.user.id,
      state: "completado"
    },
    include: [{ model: Product, as: "products", where: { id: productId } }]
  }).then((resp) => res.status(200).json(resp ? true : false));
});

// Trae un producto con ese id
server.get("/:id", (req, res) => {
  const id = req.params.id;
  Product.findOne({ where: { id }, include: "category" }).then((prod) =>
    res.json(prod)
  );
});

// Crea un producto y le asocia con categorias
server.post("/", isLoggedIn, (req, res) => {
  const {
    nombre,
    descripcion,
    precio,
    stock,
    uploadedImages
  } = req.body.product;
  const { categories } = req.body;

  Product.findOrCreate({
    where: {
      name: nombre,
      description: descripcion,
      price: precio,
      stock
    },
    defaults: {
      img: uploadedImages
    }
  }).then(([product]) => {
    if (!categories.length) {
      return res.status(400).json("No ingreso las categorias");
    }
    product
      .setCategory(categories.map((cat) => cat.id))
      .then(() => res.sendStatus(200));
  });
});

// Le da una categoria al producto
server.post("/:idProducto/category/:idCategoria", function (req, res) {
  productByCategories
    .findOrCreate({
      where: {
        productId: req.params.idProducto,
        categoryId: req.params.idCategoria
      }
    })
    .then(() => res.sendStatus(200));
});

// Updeatea un producto
server.put("/:id", function (req, res) {
  const { id } = req.params;
  const { name, description, img, price, stock } = req.body;
  Product.update({ name, description, img, price, stock }, { where: { id } })
    .then(() => res.json(req.body))
    .catch(() => res.status(400).send("Campo no encontrado"));
});

// Borra la relacion categoria/producto
server.delete("/:idProducto/category/:idCategoria", function (req, res) {
  productByCategories
    .destroy({
      where: {
        productId: req.params.idProducto,
        categoryId: req.params.idCategoria
      }
    })
    .then(() => res.sendStatus(200));
});

// Borra todas las relaciones de un producto y sus categorias
server.delete("/:idProducto/all", function (req, res) {
  productByCategories
    .destroy({
      where: {
        productId: req.params.idProducto
      }
    })
    .then(() => res.sendStatus(200));
});

// Borra un producto
server.delete("/:id", function (req, res) {
  Product.destroy({ where: { id: req.params.id } })
    .then(() => res.json("Producto Eliminado"))
    .catch(() => res.sendStatus(500));
});

//Modifica una review
server.put("/review/:idReview", (req, res) => {
  const { score, description } = req.body;
  const { idReview } = req.params;

  if (+score === NaN && score >= 0.5 && score <= 5) {
    return res.status(400).json("Score tiene que ser entero entre 1 y 5");
  }

  Review.update(
    { score, description },
    { where: { id: idReview, userId: req.user.id }, returning: true }
  )
    .then((resp) => res.status(200).json(resp))
    .catch((e) => res.json(e));
});

// Crea una review de un producto
server.post("/:id/review", (req, res) => {
  const { score, description } = req.body;

  if (+score === NaN && score >= 0.5 && score <= 5) {
    return res.status(400).json("Score tiene que ser entero entre 0.5 y 5");
  }

  Review.create({
    score: score,
    description: description,
    userId: req.user.id,
    productId: req.params.id
  })
    .then((resp) => res.status(200).json(resp))
    .catch((e) => res.json(e));
});

//Elimina una review
server.delete("/:id/review/:idReview", function (req, res) {
  const { idReview, id: productId } = req.params;
  Review.destroy({
    where: {
      id: idReview,
      productId: productId
    }
  })
    .then((resp) => console.log(resp))
    .then(() => res.json("Review Eliminada"))
    .catch((e) => res.json(e));
});

//Trae todas las review de un producto
server.get("/:id/review", (req, res) => {
  const arr = [];

  Review.findAll({
    where: {
      productId: req.params.id
    },
    include: [{ model: User }]
  })
    .then((resp) => {
      resp.map((revi) => {
        arr.push({
          id: revi.id,
          authorId: revi.userId,
          content: revi.description,
          score: +revi.score,
          author: revi.user.firstName + " " + revi.user.lastName,
          createdAt: revi.createdAt
        });
      });

      res.status(200).json(arr);
    })

    .catch((e) => res.json(e));
});

module.exports = server;
