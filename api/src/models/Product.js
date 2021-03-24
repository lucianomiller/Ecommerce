const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("product", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          args: true,
          msg: "Debe ser  un número"
        },
        min: {
          args: 1,
          msg: "Debe ser mayor a uno"
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: {
          args: true,
          msg: "Debe ser  un número"
        },
        min: {
          args: -1,
          msg: "Debe ser un numero positivo"
        }
      }
    },

    img: {
      type: DataTypes.STRING,
      defaultValue: "https://www.webwork.com.ar/images/default.png"
    }
  });
};
