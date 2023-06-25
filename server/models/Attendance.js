module.exports = (sequelize, DataTypes) => {
    const Attendance = sequelize.define("Attendence", {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    });
  
    // Attendence.associate = (models) => {
    //     Attendence.belongsTo(models.Students, { foreignKey: 'student_id' });
    // };
  
    return Attendance;
  };
  