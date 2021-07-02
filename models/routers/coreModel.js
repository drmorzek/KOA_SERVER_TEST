const coreController = requireRoot("./controllers/coreController")

module.exports = (router) => router.get('/', coreController.getLessons);
