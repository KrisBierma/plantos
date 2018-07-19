module.exports = function (sequelize, DataTypes) {
    var Plant = sequelize.define("Plant", {
        plant_common_name: {
            type: DataTypes.STRING,
            allowNull: true,
            default: ""
        },
        plant_scientific_name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        plant_water_text: {
            type: DataTypes.TEXT("long"),
            allowNull: true,
        },
        plant_water_int: {
            type: DataTypes.INTEGER,
            allowNull: true,
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

    Plant.associate = function (models) {
        Plant.belongsTo(models.User, {
            foreignKey: {
                name: 'UserId'
            }
        });
        Plant.hasMany(models.lastWatered);
        Plant.belongsTo(models.Master_Plant,
            {foreignKey: {
                allowNull: true,
            },
            constraints: false
            });
    };

    return Plant;
};
