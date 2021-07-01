const {
    Sequelize,
    DataTypes,
    Model
} = require("sequelize")
const fs = require('fs')
const path = require('path')

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './lesson.db'
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