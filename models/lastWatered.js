module.exports = function (sequelize, DataTypes, TIMESTAMP) {
    var lastWatered = sequelize.define("lastWatered", {
        // comments: {
        //     type: DataTypes.TEXT('long')
        // },
        // neverWatered: {
        //     type: DataTypes.BOOLEAN
        // }
        // createdAt: {
        //     type: DataTypes.TIMESTAMP,
        //     allowNull: false
        // }
    });

    lastWatered.associate = function (models) {
        lastWatered.belongsTo(models.User);
        lastWatered.belongsTo(models.Plant);
    };

    return lastWatered;
}; 