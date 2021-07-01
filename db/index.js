const {
    Sequelize,
    DataTypes,
    Model
} = require("sequelize")
const fs = require('fs')
const path = require('path')

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    operatorsAliases: false,
  
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
  
  })

const modelsPath = path.join(__dirname, 'models')
const models = fs.readdirSync(modelsPath)
models.forEach(file => {
    require(path.join(modelsPath, file))(DataTypes, Model, sequelize)
})

sequelize
    .sync()
    .then((result) => {
        console.log("db sync correct");
    })
    .catch((err) => console.log(err));

module.exports = sequelize;