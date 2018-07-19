var db = require("../models");

module.exports = function (app) {

    // GET route for all plants
    app.get("/api/plants/", function (req, res) {
        db.Plant.findAll({
            include: [{model: db.User}]
            // where:{id:req.user.id}
        })
            .then(function (dbPlant) {
                res.json(dbPlant);
                console.log("app.get");
            });
    });

    // get route for current user: id, email, password
    app.get("/api/user/", function (req, res) {
        db.User.findOne({
            where: {
                id: req.user.id
            }
        })
            .then(function (dbUser) {
                res.json(dbUser);
            });
    });
    
    // GET route for specific plant -- do we need this??
    // app.get("/api/plants/:id", function (req, res) {
    //     console.log(req.params.id);
    //     db.Plant.findOne({
    //         where: {
    //             id: req.params.id
    //         }
    //     })
    //         .then(function (dbPlant) {
    //             res.json(dbPlant);
    //         });
    // });

    // GET route for all plants for a specific user
    // also includes user's id, email and password
    app.get("/api/usersplants/", function (req, res) {
        db.User.findOne({
            include: [{
                model: db.Plant
                // model: db.Images,
            }],
            where: {
                id: req.user.id
            }
        })
            .then(function (plantsPerUser) {
                res.json(plantsPerUser);
                // console.log(req.user.id);
            });
    });

    // app.get("/api/userPlants2", function (req, res) {
    //     db.plantUser.findAll({

    //     })
    //     .then(function(usersplants) {
    //         res.json(usersplants);
    //     });
    // });

    // GET route for all lastWatered data for a specific user and specific plant
    //don't need /:Userid bc it's already in the req
    app.get("/api/lastWatered/:Plantid", function (req, res) {
        db.lastWatered.findAll({
            limit: 4,
            order: [['createdAt', 'DESC']],
            where: {
               UserId:req.user.id,
               PlantId:req.params.Plantid
            }
        })
            .then(function (wateredData) {
                res.json(wateredData);
                console.log("app.get");
            });
    });

    // GET route for all master images
    app.get("/api/masterPlants/", function (req, res) {
        db.Master_Plant.findAll({
            // include: [db.Image]
        })
            .then(function (dbMaster) {
                res.json(dbMaster);
                console.log("app.get");
            });
    });

    // GET route for a specific master images
    app.get("/api/masterPlants/:id", function (req, res) {
        db.Master_Plant.findOne({
            where: {id: req.params.id}
        })
            .then(function (dbMaster) {
                res.json(dbMaster);
                console.log("app.get");
            });
    });

    // GET route for all lastWatered data for all plants for a specific user
    //do we need this???
    app.get("/api/lastWatered/:id", function (req, res) {
        db.lastWatered.findAll({
            where: {
                UserId: req.params.id
            }
            // include: [db.lastWatered]
        })
            .then(function (dbLastWatered) {
                res.json(dbLastWatered);
            });
    });

    //----------------------------------------------------

    // POST route is working
//     app.post("/api/plants", function (req, res) {
// console.log("----------------------------"+req.params.id);
//         if (req.body.plant_water_int === "") {
//             req.body.plant_water_int = null;
//         }

//         db.Plant.create(
//             req.body
//         )
//         .then(function (dbPlant) {
//             res.json(dbPlant);
//         });
//     });

    // POST to plants when a user enters in their own info
    app.post("/api/plants/", function (req, res) {
        console.log(req.body);
        db.Plant.create(
            req.body
        )
        .then(function (dbusersPlants) {
            res.json(dbusersPlants);
        });
    });

    // POST lastWatered
    app.post("/api/lastWatered/", function (req, res) {
        db.lastWatered.create(
            req.body
        )
        .then(function (dbLastWatered) {
            res.json(dbLastWatered);
        });
    });

    //POST to user's plants (and update plants table too)
    app.post("/api/plants", function(req, res){
        console.log(req.body);
        console.log(req.user);
        console.log(req.user.id);
        db.Plant.create({
            // req.body,
            id: req.user.id
        })
        .then(function (dbPlant) {
            res.json(dbPlant);
        });
    });

    //----------------------------------------------------
    // PUT - this updates lwd1, 2, 3, 4 on lastwatered table
    app.put("/api/lastWatered/Update", function (req, res) {
        db.lastWatered.update({
        })
            .then(function (dbLastWatered) {
                res.json(dbLastWatered);
            });
    });

    // PUT route - updates the last_watered_date, lwd1,2,3,4, plant_water_int???? all in one or separate???
    app.put("/api/lastWatered/:id", function (req, res) {
        db.Plant.update(
            {
                last_water_int: req.body.last_water_int
            },
            {
                where: {
                    id: req.params.id
                }
            })
            .then(function (dbPlant) {
                res.json(dbPlant);
            });
    });

    //--------------------------------------------------
    // DELETE route
    app.delete("api/plants/:id", function (req, res) {
        db.Plant.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(function (dbPlant) {
                res.json(dbPlant);
            });
    });
};                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            