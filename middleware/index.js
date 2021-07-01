const logger = require('koa-logger')
const bodyParser = require("koa-bodyparser");
const errors = require("./errors");


module.exports = [
    errors,
    logger(),
    bodyParser()
]