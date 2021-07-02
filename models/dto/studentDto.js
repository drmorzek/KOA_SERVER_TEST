module.exports = class StidentDto {
        id // id ученика
        name // имя
        visit

        constructor({id, name, visit}){
                this.id = id
                this.name = name
                this.visit = visit
        }
}