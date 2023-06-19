module.exports = (sequelize, DataTypes) => {
    const Lessons = sequelize.define("Lessons", {
      lesson_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  
    Lessons.associate = (models) => {
      Lessons.belongsTo(models.Grades, { foreignKey: 'grade_id' });
      Lessons.belongsTo(models.Subjects, { foreignKey: 'subject_id' });
      Lessons.hasMany(models.Documents, { foreignKey: 'lesson_id' });
    };
  
    return Lessons;
  };
  