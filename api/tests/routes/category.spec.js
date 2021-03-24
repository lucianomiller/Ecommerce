/* eslint-disable import/no-extraneous-dependencies */
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Category, Product, conn } = require("../../src/db.js");
const chai = require("chai");
chai.use(require("chai-properties"));
chai.use(require("chai-things"));
const { expect } = chai;

const agent = session(app);
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

const products = [
  {
    name: "producto1",
    description: "description1",
    price: 25
  },
  {
    name: "producto2",
    description: "description2",
    price: 50
  },
  {
    name: "producto3",
    description: "description3",
    price: 75
  },
  {
    name: "producto4",
    description: "description4",
    price: 100
  }
];

describe("CATEGORY routes", () => {
  beforeAll(async () => {
    await conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    });
    await conn.sync({ force: true });
    await Category.bulkCreate(categories, {
      returning: true
    }).then((createdCategories) => {
      createdCategories.forEach((category) => ids.push(category.id));
    });
  });

  const ids = [];

  describe("PUT /products/category/:id", () => {
    describe("should get 400 if:", () => {
      it("ID is not a number", () =>
        agent.put("/products/category/NOEXISTEESTEID").expect(400));

      it("category does not exist", () =>
        agent.put("/products/category/99999999999").expect(400));

      it("nothing was sent", () =>
        agent.put(`/products/category/${ids[0]}`).send({}).expect(400));

      it("only name was sent", () =>
        agent
          .put(`/products/category/${ids[0]}`)
          .send({ name: "test" })
          .expect(400));

      it("only description was sent", () =>
        agent
          .put(`/products/category/${ids[0]}`)
          .send({ description: "test" })
          .expect(400));
    });

    it("should modify category and return modified category", () =>
      agent
        .put(`/products/category/${ids[0]}`)
        .send({
          name: "product",
          description: "first"
        })
        .expect(200)
        .then((resp) => {
          const { body } = resp;
          expect(body).to.have.properties({
            id: ids[0],
            name: "product",
            description: "first"
          });
        }));
  });

  describe("GET /products/category/:categoryName", () => {
    it("should get 400 if category does not exist", () => {
      agent.get("/products/category/NOEXISTE").expect(400);
    });
  });
});
