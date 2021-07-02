const LessonsDto = requireRoot("./models/dto/coreLessonsDto")
const StudentDto = requireRoot("./models/dto/studentDto")
const TeacherDto = requireRoot("./models/dto/teacherDto")

const {models} = requireRoot('db');
const {Op} = require("sequelize");

async function getLessons(
    { date, status, teacherIds, studentsCount, page,lessonsPerPage }
    // { date, status, teacherIds,studentsCount, page = 1 ,lessonsPerPage = 5 }
) {

    let limit = (lessonsPerPage != undefined) ? parseInt(status) : 5
    let pagefind = (page != undefined) ? parseInt(page) : 1
    let offset = 0 + (pagefind - 1) * limit

    let findOpt = {
        where: {},
        offset,
        limit,  
        include: [
            {
            model: models.LessonsStudentsModel
        },
        
        ],
  }

    if(status != undefined) {
        findOpt.where.status = parseInt(status)
    }
    
    let dateFind = date?.split(',').map(e => new Date(e))
    if(dateFind != undefined) {
        findOpt.where.date = dateFind.lenth == 1 ? dateFind : {[Op.between]:dateFind}
    } 
    
    let Teachers = {model: models.LessonsTeachersModel}
    if(teacherIds != undefined) {
        Teachers.where = {
                teacher_id: teacherIds.split(',').map(e => parseInt(e))
            }
    }
    findOpt.include.push(Teachers)

    
    console.log(findOpt)
    
    
    let q = await models.LessonsModel.findAll(findOpt)

    console.log(q)
}

module.exports = getLessons