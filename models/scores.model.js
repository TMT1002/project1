const { DataTypes } = require('sequelize');
const { users,questions } = require('./index');
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
    question_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user_choice: {
      type: DataTypes.STRING,
      allowNull: false
    },
    correct: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValueL: false
    }
});

users.hasMany(scores, { foreignKey: 'user_id' });
scores.belongsTo(users, { foreignKey: 'user_id' });

questions.hasMany(scores, { foreignKey: 'question_id' });
scores.belongsTo(questions, { foreignKey: 'question_id' });

(async function () {
  await sequelize.sync().then(() => {
    console.log('Sync results Scores success!');
  });
})().catch(err => { 
  console.log('Sync results Scores fail!');
  console.log(err);
});
  
module.exports = scores;
