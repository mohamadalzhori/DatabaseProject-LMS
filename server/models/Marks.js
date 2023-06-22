module.exports = (sequelize, DataTypes) => {
    const Marks = sequelize.define("Marks", {
      mark_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mark_value: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  
    Marks.associate = (models) => {
        Marks.belongsTo(models.Grades, { foreignKey: 'grade_id' });
        Marks.belongsTo(models.Subjects, { foreignKey: 'subject_id' });
    };
    return Marks;
  };
  