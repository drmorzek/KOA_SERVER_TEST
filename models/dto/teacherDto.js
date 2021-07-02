module.exports = class TeacherDto {
    
    id // id учителя
    name // имя

    static makeDto({id, name}){
        this.id = id
        this.name = name
    }
}