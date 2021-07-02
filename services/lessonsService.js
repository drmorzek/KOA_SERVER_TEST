const LessonsDto = requireRoot("./models/dto/coreLessonsDto")
const StudentDto = requireRoot("./models/dto/studentDto")
const TeacherDto = requireRoot("./models/dto/teacherDto")

const {models} = requireRoot('db');
// const sequelize = require("sequelize");

async function getLessons(
    { date, status, teacherIds, studentsCount, page ,lessonsPerPage }
) {

    let limit = (lessonsPerPage != undefined) ? parseInt(lessonsPerPage) : 5
    let pagefind = (page != undefined) ? parseInt(page) : 1
    let offset = (pagefind - 1) * limit

    let findOpt = {
        where: {},
        raw:true,

        offset,
        limit,
        
        include: [
           
            {
                model: models.LessonsStudentsModel,
                include: [{
                    model: models.StudentsModel,                
                },
                ]                
            },
            {
                model: models.LessonsTeachersModel,
                include: [{
                    model: models.TeachersModel,                
                },
                ]                
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

    
    let q = await models.LessonsModel.findAndCountAll(findOpt)

    let countstudents = {};

    q.rows.forEach(element => {        
        countstudents[element.id] = countstudents[element.id] != undefined 
                ? countstudents[element.id] + 1 
                : 1
    });

    

    // console.log(q.rows.filter(x => x['LessonsStudentsModels.student_id']).length)
    console.log(q.rows)
    console.log(countstudents)
}

module.exports = getLessons