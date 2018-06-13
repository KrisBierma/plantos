module.exports = function (sequelize, DataTypes) {
  var usersPlants = sequelize.define("usersPlants", {
      comments: {
          type: DataTypes.TEXT('long')
      }
     
  });

  usersPlants.associate = function (models) {
      // console.log(models.userPlants);
      console.log(models.Plant);

      usersPlants.belongsTo(models.User);
      usersPlants.belongsTo(models.Plant);
  };

  return usersPlants;
}; 