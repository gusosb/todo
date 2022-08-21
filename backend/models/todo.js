const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class Todo extends Model {}

Todo.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isImportant: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'todo',
})

module.exports = Todo