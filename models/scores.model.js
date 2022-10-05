const { DataTypes } = require('sequelize');
const { users } = require('./index');
const { sequelize } = require('./connectionDB');

const scores = sequelize.define('scores', {
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
    score: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
});

users.hasMany(scores, { foreignKey: 'user_id' });
scores.belongsTo(users, { foreignKey: 'user_id' });

(async function () {
  await sequelize.sync().then(() => {
    console.log('Sync results Scores success!');
  });
})().catch(err => { 
  console.log('Sync results Scores fail!');
  console.log(err);
});
  
module.exports = scores;
