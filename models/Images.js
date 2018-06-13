module.exports = function (sequelize, DataTypes) {
    var Images = sequelize.define("Image", {
        image_url: {
            // type: DataTypes.BLOB('long')
            type: DataTypes.STRING
        },
        title: {
            type: DataTypes.STRING
        },
        caption:{
            type: DataTypes.STRING
        }
    });

    Images.associate = function (models) {
        Images.belongsTo(models.User);
        // Images.belongsToMany(models.Plant, {
        //     through: {
        //         model: 'ItemImage',
        //         unique: false
        //     },
        //     foreignKey: 'Image_ID',
        //     constraints: false
        // });
        Images.belongsToMany(models.Master_Plant, {
            through: {
                model: 'masterImage',
                unique: false
                // scope: {
                //     imageable: "Master_Plant"
                // }
            },
            foreignKey: 'imageID',
            constraints: false
        });
    };

    return Images;
}; 