const { DataTypes } = require('sequelize');
const {users} = require("./index")
const { sequelize } = require("./connectionDB");


const session = sequelize.define("session", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    refresh_token: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    access_token: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});


(async function() {
    await sequelize.sync().then(() => {
      console.log("Sync session Table success!");
    });
  })().catch((err) => {
    console.log("Sync session Table fail!");
    console.log(err);
});

module.exports = session;