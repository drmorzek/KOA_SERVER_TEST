
module.exports = (DataTypes, Model, sequelize) => {
    class LessonsStudentsModel extends Model { }

    LessonsStudentsModel.init({
        // Model attributes are defined here
        lesson_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        student_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            // allowNull defaults to true
        },
        visit: {
            type: DataTypes.BOOLEAN ,
            allowNull: false,
            // allowNull defaults to true
        }
    }, {
        timestamps: true,
        updatedAt: false,
        
        createdAt: false,
        freezeTableName: true,
        sequelize, // We need to pass the connection instance
        tableName: "lesson_students", // We need to choose the model name
    });

    return LessonsStudentsModel
}
