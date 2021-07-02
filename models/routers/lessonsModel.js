const lessonsController = requireRoot("./controllers/lessonsController")

module.exports = (router) => router.post('/lessons', lessonsController.addLessons);