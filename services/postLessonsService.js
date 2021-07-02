
const moment = require('moment');
const {Sequelize, models} = requireRoot('db');
const { Op } = Sequelize;


// {
//     "teacherIds": [1,2], 
//     "title": "Blue Ocean", 
//     "days": [0,1,3,6], 
//     "firstDate": "2019-09-10", 
//     "lessonsCount": 9, 
//     "lastDate": "2019-12-31" 
//     }


async function postLessons(
    {
        teacherIds, 
        title,
        days,
        firstDate,
        lessonsCount,
        lastDate
      }
) {

    if(lessonsCount != undefined && lastDate != undefined ) return Promise.reject("Must be lessonsCount or lastDate")
    if(lessonsCount != undefined && lessonsCount >= 300) lessonsCount = 300;  

    let date1 = moment(firstDate,'YYYY-MM-DD');
    let date2 = lastDate != undefined 
                ? moment(lastDate,'YYYY-MM-DD') 
                : null;
    let countdays = lessonsCount == undefined 
                    ? date2.diff(date1, 'days') 
                    : parseInt(lessonsCount);
    
    if( moment(date2) >= moment(date1).add(1, 'y') ) return Promise.reject("Don't change over 1 year")              
   
    let datearr = []
    
    if(days == undefined ) {
        for (let index = 0; index < countdays; index++) {
            datearr.push(moment(date1).add(index, 'd').format('YYYY-MM-DD')) 
        }
    } else {
        let count = 0
        let datearr2 = []
        let tempdate = date1
        
        while (count <= countdays) {
            
            days.forEach(element => {
                datearr2.push(moment(tempdate).weekday(element).format('YYYY-MM-DD'))
            });
            tempdate = moment(tempdate).add(7, 'd').format('YYYY-MM-DD')
            count += days.length
        }
        datearr = datearr2
                .map(e => {
                    if(moment(e) >= moment(date1)) return e
                })
                .filter(e => e != undefined)
                .splice(0, countdays)
            
    }

    let arrToDb = []

    datearr.forEach(e => {
        arrToDb.push({
            title,
            date: e
        })
    })

    let q = await models.LessonsModel.bulkCreate(arrToDb)


    

    let arrTeachersToDb = []
    teacherIds.forEach(teacher_id => {
        q.map(e => e.id).forEach(lesson_id => {
            arrTeachersToDb.push({
                lesson_id, teacher_id
            })
        })
    })

    let d = await models.LessonsTeachersModel.bulkCreate(arrTeachersToDb)

    return q.map(e => e.id)

}

module.exports = postLessons