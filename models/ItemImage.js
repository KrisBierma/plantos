module.exports = function (sequelize, DataTypes) {
  var ItemImage = sequelize.define("ItemImage", {
    // imageable: {
    //   type: DataTypes.STRING    
    // }
  });

  return ItemImage;
}; 