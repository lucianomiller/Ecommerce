const server = require("express").Router();
const mercadopago = require("mercadopago");

mercadopago.configure({
  access_token:
    "APP_USR-1774540457815420-020918-00f81edde6d5f88374fd6d9a3af1bb17-713178849",
});

server.post("/", (req, res) => {
  const Total = req.body;

  let preference = {
    items: Total,
    back_urls: {
      success: "http://localhost:3000/checkout",
      failure: "http://localhost:3000/",
      pending: "http://localhost:3000/checkout",
    },
    auto_return: "approved",
  };
  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      res.json(response.body.init_point);
    })
    .catch(function (error) {
      console.log(error);
    });
});

module.exports = server;
