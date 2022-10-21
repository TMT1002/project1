const { DataTypes } = require('sequelize');
const { sequelize } = require('./connectionDB');
const { users } = require('./index');

const verifyTokens = sequelize.define('verifyTokens', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  verifyToken: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  email: {
    type: DataTypes.TEXT,
    allowNull: true
  }
});

users.hasMany(verifyTokens, { foreignKey: 'user_id' });
verifyTokens.belongsTo(users, { foreignKey: 'user_id' });

(async function () {
  await sequelize.sync().then(() => {
    console.log('Sync verifyTokens Table success!');
  });
})().catch(err => {
  console.log('Sync verifyTokens Table fail!');
  console.log(err);
});


module.exports = verifyTokens;
