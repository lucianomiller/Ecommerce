const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("orden", {
    state: {
      type: DataTypes.ENUM(["creado", "procesando", "cancelado", "completado"])
    }
  });
};
