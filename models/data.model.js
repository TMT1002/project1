const { DataTypes } = require('sequelize');
const { users,questions } = require('./index');
const { sequelize } = require('./connectionDB');

const data = sequelize.define('data', {
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
    answer_correct: {
      type: DataTypes.STRING,
      allowNull: true
    },
    correct: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValueL: false
    },
    session: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
});

users.hasMany(data, { foreignKey: 'user_id' });
data.belongsTo(users, { foreignKey: 'user_id' });

questions.hasMany(data, { foreignKey: 'question_id' });
data.belongsTo(questions, { foreignKey: 'question_id' });


(async function () {
  await sequelize.sync().then(() => {
    console.log('Sync results data success!');
  });
})().catch(err => { 
  console.log('Sync results data fail!');
  console.log(err);
});
  
module.exports = data;
