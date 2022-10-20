const { DataTypes } = require('sequelize');
const { sequelize } = require('./connectionDB');

const questions = sequelize.define('questions', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  image: {
    type: DataTypes.TEXT,
    allowNull: true,
  }
});

(async function () {
  await sequelize.sync().then(() => {
    console.log('Sync questions Table success!');
  });
})().catch(err => {
  console.log('Sync questions Table fail!');
  console.log(err);
});

module.exports = questions;
