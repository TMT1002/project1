const { DataTypes } = require('sequelize');
const { sequelize } = require("./connectionDB");

const answers = sequelize.define("answers", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    question_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    answer_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    content:{
        type: DataTypes.TEXT,
        allowNull: false,
    },
    correct: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
});

(async function() {
    await sequelize.sync().then(() => {
      console.log("Sync answers Table success!");
    });
  })().catch((err) => {
    console.log("Sync answers Table fail!");
    console.log(err);
});

module.exports = answers;