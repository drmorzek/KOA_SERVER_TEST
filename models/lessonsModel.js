const lessonsController = require("../controllers/lessonsController")

module.exports = (router) => router.post('/lessons', lessonsController.addLessons);