module.exports = (sequelize, DataTypes) => {
    const Teachers = sequelize.define("Teachers", {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  
    return Teachers;
  };