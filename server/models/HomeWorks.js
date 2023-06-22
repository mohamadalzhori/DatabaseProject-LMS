module.exports = (sequelize, DataTypes) => {
    const HomeWorks = sequelize.define("HomeWorks", {
      homework_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      homework_body: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      homework_deadline: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  
    HomeWorks.associate = (models) => {
        HomeWorks.belongsTo(models.Grades, { foreignKey: 'grade_id' });
        HomeWorks.belongsTo(models.Subjects, { foreignKey: 'subject_id' });
    };
    return HomeWorks;
  };
  