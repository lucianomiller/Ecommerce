const { Category, conn } = require("../../src/db.js");
const chai = require("chai");
chai.use(require("chai-properties"));
chai.use(require("chai-things"));
const { expect } = chai;
const app = require("../../src/app");

describe("Category model", () => {
  beforeAll(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );

  describe("Validators", () => {
    beforeEach(() => Category.sync({ force: true }));
    describe("name", () => {
      it("should throw an error if name is null", (done) => {
        Category.create({})
          .then(() => done(new Error("It requires a valid name")))
          .catch((err) => {
            expect(err).to.exist;
            expect(err).to.be.an("error");
            expect(err.errors).to.contain.a.thing.with.properties({
              path: "name",
              type: "notNull Violation"
            });
            done();
          });
      });
    });

    describe("name", () => {
      it("should throw an error if description is null", (done) => {
        Category.create({ name: "test" })
          .then(() => done(new Error("It requires a valid name")))
          .catch((err) => {
            expect(err).to.exist;
            expect(err).to.be.an("error");
            expect(err.errors).to.contain.a.thing.with.properties({
              path: "description",
              type: "notNull Violation"
            });
            done();
          });
      });
    });
  });
});
