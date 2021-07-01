const models = requireRoot('db').models;

class coreController {

    static getLessons(ctx, next) {
        // ctx.router available
        console.log(ctx.query)
        console.log(models)
        ctx.body = "Hi"
      }

}

module.exports = coreController