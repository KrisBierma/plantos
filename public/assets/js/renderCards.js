// renders the cards on my plants page

$(document).ready(function () {

  getPlants();
  
  // gets the user's plant data
  function getPlants() {
    $.get("/api/usersplants/", function (plantData) {
      var data = plantData.Plants; //gives plants and ids
      for (var i = 0; i < data.length; i++) {
        var index=i;
        var plantId = data[index].id;
        renderCards(data, index, plantId);       
      }
    })
  }

  // renders plant cards on the page with data from getPlants()
  function renderCards(data, index, plantId){
    $.ajax({
      type:"GET",
      url: "/api/lastWatered/"+plantId,
      async: true,
      dataType: "json"
    }).then(function (waterData){
      // waterData is from lastWatere db
      console.log('waterData: ');
      console.log(waterData);
      // data is all the user's plants with common name, etc. 
      console.log('data: ');
      console.log(data);


      //adding bootstrap card
      var newDiv = $("<div>");
      newDiv.addClass("card");
      newDiv.attr("id", data[index].id);

      var newImg = $("<img>");
      newImg.addClass("card-img-top");
      newImg.attr("alt", data[index].plant_common_name);
      newImg.attr("src", data[index].image_url);

      var newDiv2 = $("<div>");
      newDiv2.addClass("card-body");

      var newTitle = $("<h3>");
      newTitle.addClass("card-title text-truncate");
      newTitle.text(data[index].plant_common_name);

      var newButton = $("<button>");
      newButton.addClass("btn btn-outline-primary btn-block");
      newButton.attr("id", data[index].id);

      // assign lwd; if newly added plant then no lwd
      var lwd;
      // console.log(waterData);
      // console.log(waterData[0].neverWatered);
      if (waterData[0].neverWatered === true) {
        lwd = 0;
      }
      else {
        lwd = waterData[0].createdAt;
      };
      var int = data[index].plant_water_int;

      //if there's only 1 lwd (plant was newly created) and an int-->water it msg
      if (waterData.length === 1 && int !== null){
        newButton.text("Water Now");
        newButton.addClass("waterNowBtn");
      }

      //if there's more than 1 lwd and an int-->calc next date based on lwd and int
      //if date diff =0 water now msg, if too much time elapsed water now msg, or if more than 0 water in ? days msg
      else if (waterData.length > 1 && int !== null){
        //add water_int to lwd to calc next date
        var newWaterDate = moment(lwd, "YYYY MM DD").add(int, "days").format("YYYY MM DD");

        var difference = moment().diff(lwd, "days");

        //if lwd = today --> watered text
        if (newWaterDate === moment().format("YYYY MM DD")){
          newButton.text("Watered");
          newButton.addClass("feelGoodMsg");//need this?
          //when to delete this?? add data-toggle="modal" data-target="#exampleModal" to toggle modal
          newButton.attr("data-toggle", "modal");
          newButton.attr("data-target", "#happyMsgModal");
        }

        //if lwd + int is less than today --> water now text
        else if (difference > int){
          newButton.text("Water Now");
          newButton.addClass("waterNowBtn");
        }

        // if there's one day left --> 1 day left msg
        else if (difference = 1) {
          newButton.text(difference + " Day Left");
          newButton.attr("days", difference);
          newButton.addClass("changeCycleBtn");
        }

        // otherwise figure out how many more days until watering --> __ days left msg
        else {
          newButton.text(difference + " Days Left");
          newButton.attr("days", difference);
          newButton.addClass("changeCycleBtn");
        }
      }

      //if there's 1, 2, 3, lwd and no int-->calculating cycle msg
      else if (waterData.length <= 3 && int === null){
        newButton.text("Calculating watering cycle...");
        newButton.addClass("figuringCycle");            
      }

      //if there's 4 lwd and no int-->calc int, send int, then choose option from above
      else if (waterData.length = 4 && int === null){
        var difference = 0;

        //find the difference btw lwd4 and 3, 3 and 2, 2 and 1
        //add the differences up
        for (var i=0; i<4; i++){
          console.log(waterData[i]);
          difference += moment(waterData[i], "YYYY MM DD").diff(waterData[i+1], "days");
          console.log(difference);
        }
        //divide by 3
        console.log(difference/3);

        //send water_int to plants table
        $.put("/api/waterint/", {
          id: data[index].id,
          water_int: difference
        }).then(function(data){

        });
      }

      else {
        console.log("error");
      };

      newDiv2.append(newTitle);
      newDiv2.append(newButton);
      newDiv.append(newImg);
      newDiv.append(newDiv2);

      $("#myPlantsPage").prepend(newDiv);
    })//end ajax call
  }

});