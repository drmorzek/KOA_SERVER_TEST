
module.exports = (DataTypes, Model, sequelize) => {
    class LessonsTeachersModel extends Model { }

    LessonsTeachersModel.init({
        // Model attributes are defined here
        lesson_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        teacher_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            // allowNull defaults to true
        }
    }, {
        timestamps: true,
        updatedAt: false,
        
        createdAt: false,
        freezeTableName: true,
        sequelize, // We need to pass the connection instance
        tableName: "lesson_teachers", // We need to choose the model name
    });

    return LessonsTeachersModel
}
