const lessonsService = requireRoot('services/lessonsService');

// Параметры фильтра:
// * date. Либо одна дата в формате YYYY-MM-DD, либо две в таком же формате через запятую
// (например, «2019-01-01,2019-09-01». Если указана одна дата, выбираются занятия на эту дату. Если
// указаны 2 даты, то выбираются занятия за период, включая указанные даты.
// * status. Статус занятия. принимается либо 0 (не проведено), либо 1 (проведено)
// * teacherIds. id учителей через запятую. Выбираются все занятия, которые ведет хотя бы один из
// указанных учителей.
// * studentsCount. количество записанных на занятия учеников. либо одно число (тогда выбирается
//   занятие с точным числом записанных), либо 2 числа через запятую, тогда они рассматриваются как
//   диапазон и выбираются занятия с количеством записанных, попадающих в диапазон включительно.
//   * page. Номер возвращаемой страницы. первая страница - 1
//   * lessonsPerPage. Количество занятий на странице. По-умолчанию - 5 занятий.

// В нормальном случае возвращается массив объектов-занятий. Каждый объект должен иметь вид:
// {
// id : 9 // id занятия
// date: ‘2019-09-01’ // Дата занятия
// title: ‘Orange’, // Тема занятия
// status: 1 // Статус занятия
// visitCount: 3, // Количество учеников, посетивших занятие (по полю visit)
// students: [ // Массив учеников, записанных на занятие
// { id: 1, // id ученика
// name: ‘Ivan’ // имя
// visit: true,
// }
// ],
// teachers: [ // Массив учителей, ведущих занятие
// { id: 1, // id учителя
// name: ‘Tanya’ // имя
// }
// ]
// }

// console.log(ctx.query.date?.split(','))
//         console.log(ctx.query.status?.split(','))
//         console.log(ctx.query.teacherIds?.split(','))
//         console.log(ctx.query.studentsCount?.split(','))
//         console.log(ctx.query.page?.split(','))
//         console.log(ctx.query.lessonsPerPage?.split(','))

class coreController {

    static async getLessons(ctx, next) {
        // ctx.router available
        // lessonsService({})
        lessonsService({ 
          date: ctx.query.date , 
          status: ctx.query.status, 
          teacherIds: ctx.query.teacherIds})

          
        ctx.body = "Hi"
      }

}

module.exports = coreController