const { DataTypes } = require('sequelize');
const { sequelize } = require('./connectionDB');
const { users, questions, answers } = require('./index');

const results = sequelize.define('results', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  questions_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  answer_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  user_choice: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
});
questions.hasMany(results, { foreignKey: 'questions_id' });
results.belongsTo(questions, { foreignKey: 'questions_id' });

users.hasMany(results, { foreignKey: 'user_id' });
results.belongsTo(users, { foreignKey: 'user_id' });

answers.hasMany(results, { foreignKey: 'answer_id' });
results.belongsTo(answers, { foreignKey: 'answer_id' });

(async function () {
  await sequelize.sync().then(() => {
    console.log('Sync results Table success!');
  });
})().catch(err => {
  console.log('Sync results Table fail!');
  console.log(err);
});

module.exports = results;
