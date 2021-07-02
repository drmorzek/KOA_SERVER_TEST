
const {Sequelize, models} = requireRoot('db');
const { Op } = Sequelize;

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
    
    let dateFind = date?.split(',').map(e => new Date(e)).sort((a, b) => a - b)
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
    
    let out = {}

    q.rows.forEach(e => {
        
        out[e.id] = {
            id : e.id,
            date : e.date,
            title : e.title,
            status : e.status,
            visitCount : 0
        }

        if(out[e.id]["students"] == undefined) out[e.id]["students"] = []
        if(out[e.id]["teachers"] == undefined) out[e.id]["teachers"] = []

        if(e['LessonsStudentsModels.visit']) out[e.id]["visitCount"]++;

        if(e['LessonsStudentsModels.StudentsModel.id'] != null ) {
            out[e.id]["students"].push(
                { 
                    id: e['LessonsStudentsModels.StudentsModel.id'], // id ученика
                    name: e['LessonsStudentsModels.StudentsModel.name'], // имя
                    visit: e['LessonsStudentsModels.visit'],
                }
            );
        } 

        if(e['LessonsTeachersModels.TeachersModel.id'] != null ) {
            out[e.id]["teachers"].push(
                { 
                    id: e['LessonsTeachersModels.TeachersModel.id'], 
                    name: e['LessonsTeachersModels.TeachersModel.name']
                }
            );
        } 
            
    })

    let countstudents
    if(studentsCount != undefined) {
        countstudents = studentsCount.split(',')
                .map(e => parseInt(e))
                .slice(0, 2)
                .sort((a, b) => a - b)
    }

    let outarr = Object.values(out)
            .filter(e => {
                if (countstudents) {
                    if(countstudents.length == 1) {
                        return e.students.length == countstudents[0]
                    } else {
                        return e.students.length >= countstudents[0] && e.students.length <= countstudents[1]
                    }
                }
                return true
            })

    return outarr;
}

module.exports = getLessons