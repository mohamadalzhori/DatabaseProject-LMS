module.exports = (sequelize, DataTypes) => {
  const Grades = sequelize.define("Grades", {
    grade_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Grades.associate = (models) => {
    Grades.hasMany(models.Subjects, { foreignKey: 'grade_id' });
  };

  return Grades;
};
