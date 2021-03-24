const server = require("express").Router();

const { Orden, User, Product } = require("../db.js");

var myLogger = function (req, res, next) {
  if (req.isAuthenticated()) return next();
  res.sendStatus(401);
};

server.get("/", (req, res) => {
  Orden.findAll({
    include: [{ model: Product }, { model: User }]
  })
    .then((resp) => res.json(resp))
    .catch((e) => res.json(e));
});

server.get("/myorden", myLogger, (req, res) => {
  Orden.findAll({
    where: { userId: req.user.id },
    include: [{ model: Product }]
  }).then((resp) => res.json(resp));
});

server.get("/:ordenId", (req, res) => {
  const { ordenId } = req.params;
  Orden.findByPk(ordenId)
    .then((resp) => res.json(resp))
    .catch((e) => res.json(e));
});

server.put("/:ordenId", (req, res) => {
  const { ordenId } = req.params;
  const { state } = req.body;

  Orden.update(
    { state },
    { where: { id: ordenId }, returning: true }
  ).then((resp) => res.status(200).json(resp));
});

module.exports = server;
