const coreController = require("../controllers/coreController")

module.exports = (router) => router.get('/', coreController.getLessons);
