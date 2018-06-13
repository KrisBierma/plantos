module.exports = function (sequelize, DataTypes) {
    var Plant = sequelize.define("Plant", {
        plant_common_name: {
            type: DataTypes.STRING,
            allowNull: true,
            default: ""
            // validate: {
            //     len: [1]
            // }
        },
        plant_scientific_name: {
            type: DataTypes.STRING,
            allowNull: true,
            // validate: {
            //     len: [1]
            // }
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
            type: DataTypes.BOOLEAN
        },
        sun_placement: {
            type: DataTypes.INTEGER
        },
        image_url: {
            // type: DataTypes.BLOB('long')
            type: DataTypes.STRING
        }
    });

    Plant.associate = function (models) {
        // console.log(models.userPlants);
        console.log(models.User);
        

        Plant.belongsToMany(models.User, {
            foreignKey:  {
                name: "plantID",
                allowNull: true
            },
            through: "plantUser" //will add a userId to Plant to hold th primary key value for user
        });
        Plant.hasMany(models.usersPlants);
        Plant.hasMany(models.lastWatered);
        // Plant.belongsToMany(models.Image,{
        //     foreignKey: "imageable_ID",
        //     through:{
        //        model: "ItemImage",
        //        unique: false,
        //        scope: {
        //            imageable: "Plant"
        //        }
        //     },
        //     constraints: false
                
        // });
        Plant.belongsTo(models.Master_Plant,
        {foreignKey: {
            allowNull: true,
        },
        constraints: false
    });

    };

    return Plant;
};
