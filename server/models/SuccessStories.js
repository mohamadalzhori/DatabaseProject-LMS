module.exports = (sequelize, DataTypes) => {
    const SuccessStories = sequelize.define("SuccessStories", {
      story: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  
    SuccessStories.associate = (models) => {
        SuccessStories.belongsTo(models.Students, { foreignKey: 'student_id' });
    };
  
    return SuccessStories;
  };
  