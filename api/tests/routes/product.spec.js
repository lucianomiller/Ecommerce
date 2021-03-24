/* eslint-disable import/no-extraneous-dependencies */
const session = require("supertest-session");
const {
  Product,
  Category,
  productByCategories,
  conn
} = require("../../src/db.js");

const agent = session("http://localhost:3001");

const categories = [
  {
    name: "delectus",
    description: "qui ullam ratione quibusdam voluptatem quia omnis"
  },
  {
    name: "quis",
    description: "illo expedita consequatur quia in"
  },
  {
    name: "fugiat veniam minus",
    description: "quo adipisci enim quam ut ab"
  },
  {
    name: "et porro tempora",
    description: "molestiae perspiciatis ipsa"
  },
  {
    name: "laboriosam",
    description: "illo est ratione doloremque quia maiores aut"
  },
  {
    name: "vero rerum temporibus dolor",
    description: "ipsa repellendus fugit nisi"
  }
];

describe("Routes /products", () => {
  let categoriesIds = [];

  beforeAll(async () => {
    await conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    });
    await conn.sync({ force: true }); // Sync DB

    await Category.bulkCreate(categories, { returning: true }).then((resp) => {
      categoriesIds = resp.map((cat) => cat.id);
    });
  });

  describe("GET /products", () => {
    // create some products
    beforeAll(async () => {
      await Product.sync({ force: true });

      const products = [
        {
          product: {
            name: "martillo",
            description: "description1",
            price: 25,
            stock: 5
          },
          categories: [{ id: categoriesIds[0] }, { id: categoriesIds[6] }]
        },
        {
          product: {
            name: "cemento",
            description: "description2",
            price: 50,
            stock: 25
          },
          categories: [{ id: categoriesIds[1] }]
        },
        {
          product: {
            name: "podadora",
            description: "description3",
            price: 75,
            stock: 50
          },
          categories: [{ id: categoriesIds[1] }]
        },
        {
          product: {
            name: "tuerca",
            description: "description4",
            price: 100,
            stock: 85
          },
          categories: [{ id: categoriesIds[2] }]
        }
      ];

      products.map(async (prod) => {
        await agent.post("/products/").send(prod).expect(200);
      });
    });

    it("should get 200", () => agent.get("/products/").expect(200));

    it("should get all products", () =>
      agent
        .get("/products/")
        .expect(200)
        .then(({ body }) => {
          expect(body.length).toEqual(4);
        }));
  });

  describe("POST /products", () => {
    // clean up products
    beforeAll(async () => {
      await productByCategories.sync({ force: true });
      await Product.sync({ force: true });
    });

    describe("Should give 400 if:", () => {
      test("nothing was sent", () =>
        agent
          .post("/products/")
          .send()
          .expect(400)
          .then((resp) => expect(resp.body).toEqual('"product" is required')));

      test("no name was sent", () =>
        agent
          .post("/products/")
          .send({ product: {} })
          .expect(400)
          .then((resp) => expect(resp.body).toEqual('"name" is required')));

      test("no description was sent", () =>
        agent
          .post("/products/")
          .send({ product: { name: "producto 1" } })
          .expect(400)
          .then((resp) =>
            expect(resp.body).toEqual('"description" is required')
          ));

      test("no price was sent", () =>
        agent
          .post("/products/")
          .send({
            product: { name: "producto 1", description: "description 1" }
          })
          .expect(400)
          .then((resp) => expect(resp.body).toEqual('"price" is required')));

      test("no categories array was sent", () =>
        agent
          .post("/products/")
          .send({
            product: {
              name: "producto 1",
              description: "description 1",
              price: 15,
              stock: 15
            }
          })
          .expect(400)
          .then((resp) =>
            expect(resp.body).toEqual("No ingreso las categorias")
          ));
    });

    it("Should succesfully create a product", () => {
      agent
        .post("/products/")
        .send({
          product: {
            name: "martillo",
            description: "description1",
            price: 25,
            stock: 5
          },
          categories: [{ id: categoriesIds[0] }, { id: categoriesIds[6] }]
        })
        .expect(200)
        .then(() => {
          agent
            .get("/products/")
            .expect(200)
            .then(({ body }) => {
              expect(body).toEqual(
                expect.arrayContaining([
                  expect.objectContaining({
                    name: "martillo",
                    description: "description1",
                    price: 25,
                    stock: 5
                  })
                ])
              );
            });
        });
    });
  });

  describe.only("GET /:id", () => {
    // create some products
    beforeAll(async () => {
      await Product.sync({ force: true });

      const products = [
        {
          product: {
            name: "martillo",
            description: "description1",
            price: 25,
            stock: 5
          },
          categories: [{ id: categoriesIds[0] }, { id: categoriesIds[6] }]
        },
        {
          product: {
            name: "cemento",
            description: "description2",
            price: 50,
            stock: 25
          },
          categories: [{ id: categoriesIds[1] }]
        },
        {
          product: {
            name: "podadora",
            description: "description3",
            price: 75,
            stock: 50
          },
          categories: [{ id: categoriesIds[1] }]
        },
        {
          product: {
            name: "tuerca",
            description: "description4",
            price: 100,
            stock: 85
          },
          categories: [{ id: categoriesIds[2] }]
        }
      ];

      products.map(async (prod) => {
        await agent.post("/products/").send(prod).expect(200);
      });
    });

    // it("Should bring a product whose id is :id", () => {
    //   agent
    //     .get("/products/1")
    //     .expect(200)
    //     .then((resp) => {
    //       expect(resp.body).toEqual(
    //         expect.objectContaining({
    //           name: "martillo",
    //           description: "description1",
    //           price: 25,
    //           stock: 5
    //         })
    //       );
    //     });
    // });
  });

  afterAll(async () => {
    await conn.close();
  });
});
