module.exports = (sequelize, DataTypes) => {
    const Students = sequelize.define("Students", {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      points: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    });

    Students.associate = (models) => {
      Students.belongsTo(models.Grades, { foreignKey: 'grade_id' });
    };
  
    return Students;
  };