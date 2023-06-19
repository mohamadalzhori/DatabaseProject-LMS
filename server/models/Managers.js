module.exports = (sequelize, DataTypes) => {
    const Managers = sequelize.define("Managers", {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  
    return Managers;
  };