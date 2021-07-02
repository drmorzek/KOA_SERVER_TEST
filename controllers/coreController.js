const getLessonsService = requireRoot('services/getLessonsService');



class coreController {

    static async getLessons(ctx, next) {
        try {
          ctx.status = 200
          ctx.body = await getLessonsService({ 
            date: ctx.query.date , 
            status: ctx.query.status, 
            page: ctx.query.page, 
            studentsCount: ctx.query.studentsCount, 
            lessonsPerPage: ctx.query.lessonsPerPage, 
            teacherIds: ctx.query.teacherIds})
        } catch(e){
          ctx.status = 400
          ctx.body = "Bad request"
        }
      }     

}

module.exports = coreController