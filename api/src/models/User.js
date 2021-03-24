const { UserRefreshClient } = require("google-auth-library");
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("user", {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
       allowNull: true,
    },
    cuit:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    ubicacion:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    userName: {
      type: DataTypes.STRING(25),
      // allowNull: false,
      // unique:true,
      validate: {
        len: {
          args: [2, 25],
          msg: "username muy largo",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          arg: true,
          msg: "Debe ingresar un correo valido",
        },
        // is:["/^[!@#$%^&*]",'i'],
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5, 255],
 
      }
    },
    role: {
      type: DataTypes.ENUM(["user", "admin","company"]),

      defaultValue: "user",
    },
    changePass: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    banned: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    activate:{
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
    
  });
  
  
};


