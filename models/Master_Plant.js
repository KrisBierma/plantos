module.exports = function (sequelize, DataTypes) {
    var Master_Plant = sequelize.define("Master_Plant", {
        common_name: {
            type: DataTypes.STRING,
            allowNull: true,
            default: ""
        },
        scientific_name: {
            type: DataTypes.STRING,
            validate: {
                len: [1]
            }
        },
        water_text: {
            type: DataTypes.TEXT("long"),
            validate: {
                len: [1]
            }
        },
        water_int: {
            type: DataTypes.INTEGER,
            default: null
        },
        pet_friendly: {
            type: DataTypes.INTEGER
        },
        sun_placement: {
            type: DataTypes.INTEGER
        },
        image_url: {
            type: DataTypes.STRING
        }
    });
    Master_Plant.associate = function (models) {
        Master_Plant.belongsTo(models.User);
        Master_Plant.hasMany(models.Plant);
    };

    return Master_Plant;
}; 
