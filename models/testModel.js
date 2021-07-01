const testController = require("../controllers/testController")

module.exports = (router) => router.get('/', testController.sayHi);
