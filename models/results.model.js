const { DataTypes } = require('sequelize');
const { sequelize } = require("./connectionDB");

const results = sequelize.define("results", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    questions_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    answer_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    user_choice: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    }
});

(async function() {
    await sequelize.sync().then(() => {
      console.log("Sync results Table success!");
    });
  })().catch((err) => {
    console.log("Sync results Table fail!");
    console.log(err);
});

module.exports = results;