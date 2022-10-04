const { DataTypes } = require('sequelize');
const { sequelize } = require("./connectionDB");
const {results, answers} = require("./index")

const questions = sequelize.define("questions", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

questions.hasMany(results,{
    foreignKey: 'questions_id',
})
results.belongsTo(questions);

questions.hasMany(answers,{
    foreignKey: 'questions_id',
})
answers.belongsTo(questions);

(async function() {
    await sequelize.sync().then(() => {
      console.log("Sync questions Table success!");
    });
  })().catch((err) => {
    console.log("Sync questions Table fail!");
    console.log(err);
});

module.exports = questions;