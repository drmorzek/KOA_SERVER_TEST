module.exports = class StidentDto {
        id // id ученика
        name // имя
        visit

        static makeDto({id, name, visit}){
                this.id = id
                this.name = name
                this.visit = visit
        }
}