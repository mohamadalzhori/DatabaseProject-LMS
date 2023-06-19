module.exports = (sequelize, DataTypes) => {
    const Documents = sequelize.define("Documents", {
      document_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      document_link: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  
    Documents.associate = (models) => {
      Documents.belongsTo(models.Grades, { foreignKey: 'grade_id' });
      Documents.belongsTo(models.Subjects, { foreignKey: 'subject_id' });
      Documents.belongsTo(models.Lessons, { foreignKey: 'lesson_id' });
    };
  
    return Documents;
  };
  