const { Product, conn } = require("../../src/db.js");
const chai = require("chai");
chai.use(require("chai-properties"));
chai.use(require("chai-things"));
const { expect } = chai;

describe("Product model", () => {
  beforeAll(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );

  describe("Validators", () => {
    beforeEach(() => Product.sync({ force: true }));
    describe("name", () => {
      describe("It should throw an error if: ", () => {
        it("name is null", (done) => {
          Product.create({})
            .then(() => done(new Error("It requires a valid name")))
            .catch(() => done());
        });

        it("nothing was passed to the create function", (done) => {
          Product.create({}).catch((err) => {
            expect(err).to.exist;
            expect(err).to.be.an("error");
            done();
          });
        });

        it("description is null", (done) => {
          Product.create({ name: "Producto" }).catch((err) => {
            expect(err).to.exist;
            expect(err).to.be.an("error");
            expect(err.errors).to.contain.a.thing.with.properties({
              path: "description",
              type: "notNull Violation"
            });
            done();
          });
        });

        it("price is null", (done) => {
          Product.create({ name: "Producto", description: "descr" }).catch(
            (err) => {
              expect(err).to.exist;
              expect(err).to.be.an("error");
              expect(err.errors).to.contain.a.thing.with.properties({
                path: "price",
                type: "notNull Violation"
              });
              done();
            }
          );
        });
      });
    });
  });
});
