const server = require("express").Router();

const { User, ProductoDeOrden, Product, Orden } = require("../db.js");

// Agrega un item al carrito
server.post("/:idUser", function (req, res) {
  const { productId } = req.body;
  const { idUser } = req.params;

  User.findByPk(idUser, { include: [{ model: Orden, as: "ordenes" }] }).then(
    async (user) => {
      let carritoOrden;

      if (!user.ordenes.length) {
        carritoOrden = await Orden.create({
          state: "creado",
        }).then(async (orden) => {
          await orden.setUser(user);
          await user.addOrdenes(orden);
          return orden;
        });
      } else {
        carritoOrden = user.ordenes.find((ord) => ord.state === "creado");
      }

      Product.findByPk(productId).then(async (prod) => {
        const [_, created] = await ProductoDeOrden.findOrCreate({
          where: {
            ordenId: carritoOrden.id,
            productId: prod.id,
          },
          defaults: { precio: prod.price, cantidad: 1 },
        });
        if (!created) {
          return res.status(400).json("El producto ya esta en el carrito");
        }
        res.sendStatus(200);
      });
    }
  );
});

// Retorna todos los items del carrito de un usuario
server.get("/:idUser", function (req, res) {
  const { idUser } = req.params;
  if (!idUser) return res.sendStatus(400);
  Orden.findOne({
    where: { userId: idUser, state: "creado" },
    include: [{ model: Product }],
  }).then((orden) => {
    if (!orden) return res.json([]);
    const products = orden.products.map((prod) => {
      return {
        id: prod.id,
        amount: prod.ProductoDeOrden.cantidad,
        price: prod.price,
        name: prod.name,
        stock: prod.stock,
        img: prod.img,
      };
    });
    const productsSortedAlphabetically = products.sort((cat, nextCat) => {
      let fa = cat.name.toLowerCase(),
        fb = nextCat.name.toLowerCase();

      if (fa < fb) {
        return -1;
      }
      if (fa > fb) {
        return 1;
      }
    });
    return res.json(productsSortedAlphabetically);
  });
});

// Borra todos los items de un carrito
server.delete("/:idUser", function (req, res) {
  const { idUser } = req.params;
  Orden.findOne({
    where: { userId: idUser, state: "creado" },
  }).then((orden) => {
    // if (orden === null) {
    //   return res.status(400).json("Usuario no encontrado");
    // }
    ProductoDeOrden.destroy({
      where: { ordenId: orden.id },
    }).then(() => {
      res.send("Carrito vacio");
    });
  });
});

// mergea el localStorage carrito con el de DB
server.put("/:idUser/merge", async (req, res) => {
  const { idUser } = req.params;
  const cartData = req.body;

  let orden = await Orden.findOne({
    where: { userId: idUser, state: "creado" },
  });

  if (!orden) {
    orden = await Orden.create({ userId: idUser, state: "creado" });
  }

  ProductoDeOrden.findAll({ where: { ordenId: orden.id } }).then(
    async (prods) => {
      const notInOrden = await cartData.filter((prod) => {
        const index = prods.findIndex((el) => el.productId === prod.id);
        if (index === -1) return true;
        else {
          if (prods[index].cantidad < prod.amount) {
            prods[index].cantidad = prod.amount;
            prods[index].save();
          }
        }
      });

      await notInOrden.forEach(async (prod) => {
        await ProductoDeOrden.create({
          ordenId: orden.id,
          productId: prod.id,
          precio: prod.price,
          cantidad: prod.amount,
        });
      });

      res.sendStatus(200);
    }
  );
});

// Borra un item de un carrito
server.delete("/:idUser/:productId", function (req, res) {
  const { idUser, productId } = req.params;
  Orden.findOne({
    where: { userId: idUser, state: "creado" },
  }).then((orden) => {
    // if (orden === null) {
    //   return res.status(400).json("Usuario no encontrado");
    // }
    ProductoDeOrden.destroy({
      where: { productId, ordenId: orden.id },
    }).then(() => {
      res.json("Producto eliminado del carrito");
    });
  });
});

// añade uno a la cantidad del producto
server.post("/:idUser/:productId", async function (req, res) {
  const { idUser, productId } = req.params;
  const prodStock = await Product.findByPk(productId).then(
    (resp) => resp.stock
  );
  Orden.findOne({
    where: { userId: idUser, state: "creado" },
  }).then((orden) => {
    ProductoDeOrden.findOne({
      where: { productId, ordenId: orden.id },
    }).then(async (resp) => {
      if (resp.cantidad + 1 > prodStock) return res.sendStatus(400);
      resp.cantidad++;
      await resp.save();
      res.sendStatus(200);
    });
  });
});

// Cambia la cantidad de un item
server.put("/:idUser/:productId", async function (req, res) {
  const { idUser, productId } = req.params;
  const { cantidad } = req.body;

  const prodStock = await Product.findByPk(productId).then(
    (resp) => resp.stock
  );

  Orden.findOne({
    where: { userId: idUser, state: "creado" },
  }).then((orden) => {
    ProductoDeOrden.findOne({
      where: { productId, ordenId: orden.id },
    }).then(async (resp) => {
      if (resp.cantidad > prodStock || resp.cantidad < 1)
        return res.sendStatus(400);
      resp.cantidad = cantidad;
      await resp.save();
      res.sendStatus(200);
    });
  });
});

// remueve uno a la cantidad del producto
server.delete("/:idUser/oneAmount/:productId", function (req, res) {
  const { idUser, productId } = req.params;
  Orden.findOne({
    where: { userId: idUser },
  }).then((orden) => {
    ProductoDeOrden.findOne({
      where: { productId, ordenId: orden.id },
    }).then(async (resp) => {
      if (resp.cantidad - 1 <= 0) return res.sendStatus(400);
      resp.cantidad--;
      await resp.save();
      res.sendStatus(200);
    });
  });
});

// Cambio de estado la orden, vacio el carrito y actualizo el stock
server.put("/:idUser", async (req, res) => {
  const { idUser } = req.params;
  const { estado } = req.body;

  await Orden.findOne({
    where: { userId: idUser, state: "creado" },
    include: [{ model: Product }],
  }).then((orden) => {
    orden.products.map(async ({ stock, ProductoDeOrden, id }) => {
      const stockUpdate = stock - ProductoDeOrden.cantidad;
      await Product.update(
        { stock: Math.max(stockUpdate, 0) },
        { where: { id } }
      );
    });
  });

  await Orden.update(
    { state: estado },
    {
      where: { userId: idUser, state: "creado" },
    }
  );

  const user = await User.findByPk(idUser);
  const orden = await Orden.create({
    state: "creado",
  });

  await orden.setUser(user);
  await user.addOrdenes(orden);

  res.sendStatus(200);
});

module.exports = server;
