class testController {

    static sayHi(ctx, next) {
        // ctx.router available
        ctx.body = "Hi"
      }

}

module.exports = testController