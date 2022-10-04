const { DataTypes } = require('sequelize');
const { sequelize } = require("./connectionDB");

const users = sequelize.define("users", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    first_name: {
        type: DataTypes.STRING(20),
        allowNull: false,

    },
    last_name: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    account: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    admin : {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    created_at: {type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false
    }
});


(async function() {
    await sequelize.sync().then(() => {
      console.log("Sync users Table success!");
    });
  })().catch((error) => {
    console.log("Sync Users Table fail!");
    console.log(err);
  });
  
  module.exports = users;