module.exports = function (sequelize, DataTypes) {
    var lastWatered = sequelize.define("lastWatered", {
        // comments: {
        //     type: DataTypes.TEXT('long')
        // },
        neverWatered: {
            type: DataTypes.BOOLEAN
        }
    });

    lastWatered.associate = function (models) {
        lastWatered.belongsTo(models.User);
        lastWatered.belongsTo(models.Plant);
    };

    return lastWatered;
}; 