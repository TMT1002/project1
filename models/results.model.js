const { DataTypes } = require('sequelize');
const { sequelize } = require('./connectionDB');
const { users, questions, answers } = require('./index');

const results = sequelize.define('results', {
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
  session: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  score: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
});

users.hasMany(results, { foreignKey: 'user_id' });
results.belongsTo(users, { foreignKey: 'user_id' });


(async function () {
  await sequelize.sync().then(() => {
    console.log('Sync results Table success!');
  });
})().catch(err => {
  console.log('Sync results Table fail!');
  console.log(err);
});

module.exports = results;
