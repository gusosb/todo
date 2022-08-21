const Todo = require('./todo')

const { sequelize } = require('../util/db')



sequelize.sync({ alter: true })

module.exports = {
  Todo
}