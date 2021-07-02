module.exports = class TeacherDto {
    
    id // id учителя
    name // имя

    constructor({id, name}){
        this.id = id
        this.name = name
    }
}