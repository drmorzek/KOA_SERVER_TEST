
module.exports = (DataTypes, Model, sequelize) => {
    class TeachersModel extends Model { }

    TeachersModel.init({
        // Model attributes are defined here
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        name: {
            type: DataTypes.STRING(36),
            allowNull: false,
            // allowNull defaults to true
        },
    }, {
        timestamps: true,
        updatedAt: false,
        
        createdAt: false,
        freezeTableName: true,
        sequelize, // We need to pass the connection instance
        tableName: "teachers", // We need to choose the model name
    });

    return TeachersModel
}
