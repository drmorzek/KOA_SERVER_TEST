const postLessonsService = requireRoot('services/postLessonsService');

class lessonsController {

    static async addLessons(ctx, next) {
       try {
         let body = ctx.request.body
         let ids = await postLessonsService(body)

         ctx.body = ids
         ctx.status = 200
         
       } catch (error) {
         
         ctx.body = error
         ctx.status = 400
       }
    }
}

module.exports = lessonsController