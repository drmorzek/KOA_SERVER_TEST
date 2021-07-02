const {
    Sequelize,
    DataTypes,
    Model
} = require("sequelize")
const fs = require('fs')
const path = require('path')

const associations = require('./associations')

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    operatorsAliases: false,
    logging: false
  })

const modelsPath = path.join(__dirname, 'models')
const models = fs.readdirSync(modelsPath)
models.forEach(file => {
    require(path.join(modelsPath, file))(DataTypes, Model, sequelize)
})

sequelize
    .sync()
    .then(() => console.log("db sync correct"))

associations(sequelize.models)

module.exports = sequelize;