module.exports = (sequelize, DataTypes) => {
  const Subjects = sequelize.define("Subjects", {
    subject_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Subjects.associate = (models) => {
    Subjects.belongsTo(models.Grades, { foreignKey: 'grade_id' });
    Subjects.hasMany(models.Lessons, { foreignKey: 'subject_id' });
  };

  return Subjects;
};
