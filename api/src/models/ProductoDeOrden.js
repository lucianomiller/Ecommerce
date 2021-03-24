const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("ProductoDeOrden", {
    cantidad: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: {
          args: true,
          msg: "Debe ser un número"
        },
        min: {
          args: 1,
          msg: "Debe ser mayor a cero"
        }
      }
    },
    precio: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: {
          args: true,
          msg: "Debe ser  un número"
        },
        min: {
          args: 1,
          msg: "Debe ser mayor a cero"
        }
      }
    }
  });
};
