require("dotenv").config();

const path = require('path')
global.requireRoot = file => require(path.join(__dirname, file))

const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 8000;

const Koa = require("koa");
const Router = require("koa-router");


const middleware = require("./middleware");
const models = require("./models");
const db = require("./db")

const app = new Koa();
const router = new Router();

middleware.forEach(m => app.use(m))
models.forEach(m => m(router))

app
  .use(router.routes())
  .use(router.allowedMethods());


db.authenticate()
    .then(() => {
        console.log("Connection to Database has been established successfully.")
        app.listen(PORT, HOST, () => {
            console.log("Server start on", HOST, PORT);
        })
    })   
    .catch((err) => console.log(err));
