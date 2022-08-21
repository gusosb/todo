const Sequelize = require('sequelize')
const { DATABASE_URL } = require('./config')
// Databas url hämtas från config

// Skapar en ny sequelize instans some connectar till min databas
const sequelize = new Sequelize(DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    ssl: process.env.DB_ENABLE_SSL,
    dialectOptions: {
        ssl: process.env.DB_ENABLE_SSL && {
        require: true
        }
}
})


// Försöker connecta till min databas, returna inget men dödar processen om failar
const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    console.log('connected to the database')
  } catch (err) {
    console.log('failed to connect to the database')
    return process.exit(1)
  }

  return null
}

module.exports = { connectToDatabase, sequelize }