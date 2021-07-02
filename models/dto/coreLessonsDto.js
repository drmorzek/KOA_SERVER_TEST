

module.exports = class CoreLessonsDto {

    id  // id занятия
    date // Дата занятия
    title // Тема занятия
    status // Статус занятия
    visitCount // Количество учеников, посетивших занятие (по полю visit)
    students = [] // Массив учеников, записанных на занятие

    teachers = [] // Массив учителей, ведущих занятие

    static makeDto({
        id,  // id занятия
        date, // Дата занятия
        title, // Тема занятия
        status, // Статус занятия
        visitCount, // Количество учеников, посетивших занятие (по полю visit)
        students = [], // Массив учеников, записанных на занятие
    
        teachers = []}) {

            this.id = id
            this.date = date
            this.title = title
            this.status = status
            this.visitCount = visitCount
            this.students = students
            this.teachers = teachers       

    }

}