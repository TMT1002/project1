const { DataTypes } = require('sequelize');
const { sequelize } = require('./connectionDB');

const users = sequelize.define('users', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
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
  admin: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false,
  },
});

(async function () {
  await sequelize.sync().then(() => {
    console.log('Sync users Table success!');
  });
})().catch(err => {
  console.log('Sync Users Table fail!');
  console.log(err);
});

module.exports = users;
