module.exports = (models) => {

    const {
        LessonsModel,
        LessonsStudentsModel,
        LessonsTeachersModel,
        StudentsModel,
        TeachersModel
      } = models;


    StudentsModel.hasMany(LessonsStudentsModel, {
        constraints: false,

        foreignKey: {
          name: 'student_id',
          allowNull: false,
        }
      });

    LessonsModel.hasMany(LessonsStudentsModel, {
        constraints: false,

        foreignKey: {
          name: 'lesson_id',
          allowNull: false,
        }
      });

    TeachersModel.hasMany(LessonsTeachersModel, {
            constraints: false,

            foreignKey: {
                name: 'teacher_id',
                allowNull: false,
            }
        });

    LessonsModel.hasMany(LessonsTeachersModel,{
        constraints: false,

        foreignKey: {
          name: 'lesson_id',
          allowNull: false,
        }
      });
   
      
    LessonsTeachersModel.belongsTo(TeachersModel,{
        constraints: false,

        foreignKey: {
            name: 'teacher_id',
            allowNull: false,
        }
    });

    LessonsStudentsModel.belongsTo(StudentsModel,{
        constraints: false,

        foreignKey: {
            name: 'student_id',
            allowNull: false,
        }
    });
    
    LessonsTeachersModel.belongsTo(TeachersModel, {
        constraints: false,

        foreignKey: {
            name: 'teacher_id',
            allowNull: false,
        }
    });
    
    
    LessonsStudentsModel.belongsTo(StudentsModel, {
        constraints: false,

        foreignKey: {
            name: 'student_id',
            allowNull: false,
        }
    });


}