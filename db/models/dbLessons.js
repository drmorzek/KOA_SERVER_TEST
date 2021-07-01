
module.exports = (DataTypes, Model, sequelize) => {
    class LessonsModel extends Model { }

    LessonsModel.init({
        // Model attributes are defined here
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
            // allowNull defaults to true
        },
        title: {
            type: DataTypes.STRING(36),
            allowNull: false,
            // allowNull defaults to true
        },
        status: {
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
        tableName: "lessons", // We need to choose the model name
    });

    return LessonsModel
}
