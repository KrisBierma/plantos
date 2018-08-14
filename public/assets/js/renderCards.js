// renders the cards on my plants page

$(document).ready(function () {
console.log("here");
  // getInfo();
  renderCards();
  
  // function getInfo() {
  //   $.get("/api/usersplants/" , function(data222) {
  //     console.log(data222)
  //     // setTimeout(renderCards(data222), 50000);
  //     setTimeout(function(){
  //       renderCards(data222);
  //     }, 3000);
  //     // renderCards(data222)
  //   });
  // };

  // function what(d) {
  //   console.log(d)
  // }

  // gets ALL of the user's plant data
  function renderCards(plantData) {
    $.get("/api/usersplants/", function (plantData) {
      const data = plantData.Plants; //gives plants and ids
      console.log(plantData);
      for (let i = 0; i < data.length; i++) {
        const index=i;
        const plantId = data[index].id; // delete later
        const waterData = data[i].lastWatereds;
        console.log(index, plantId, waterData);
console.log(data[i].plant_common_name);

      //adding bootstrap card
      const newDiv = $("<div>");
      newDiv.addClass("card");
      newDiv.attr("id", data[index].id);

      const newImg = $("<img>");
      newImg.addClass("card-img-top");
      newImg.attr("alt", data[index].plant_common_name);
      newImg.attr("src", data[index].image_url);

      const newDiv2 = $("<div>");
      newDiv2.addClass("card-body");

      const newTitle = $("<h3>");
      newTitle.addClass("card-title text-truncate");
      newTitle.text(data[index].plant_common_name);

      const newButton = $("<button>");
      newButton.addClass("btn btn-outline-primary btn-block");
      newButton.attr("id", data[index].id);

      // make lwd equal to new Date(), which converts the mysql date into the current user's current time (using correct time zone); otherwise it's based on UTC
      const lwd = new Date(waterData[0].createdAt).toDateString();
console.log(lwd);
      // int is the number of days between waterings; if no int, then it's 0
      const int = data[index].plant_water_int;
console.log(waterData.length);
      // if there's 1 lwd (meaning it was just created) and an int-->water it msg
      if (waterData.length === 1 && int !== 0){
        newButton.text("Water Now");
        newButton.addClass("waterNowBtn");
      }

      //if there's more than 1 lwd and an int-->calc next date based on lwd and int
      //if date diff =0 water now msg, if too much time elapsed water now msg, or if more than 0 water in ? days msg
      else if (waterData.length > 1 && int !== 0){
        //add water_int to lwd to calc next date
        // const newWaterDate = moment(lwd, "YYYY MM DD").add(int, "days").format("YYYY MM DD");
// console.log(newWaterDate);
// console.log(dayA.diff(dayB, "days"));
const now = new Date();
moment.suppressDeprecationWarnings = true;
// console.log(now, now.toString());
// console.log(moment(now.toString()).diff(lwd, "days"));
        const difference = moment(now, "ddd MMM DD YYYY HH:mm:ss ZZ").diff(lwd, "days");
console.log(difference, int);

        // if this isn't a newly added plant and the lastWatered = today --> watered text
        if (lwd === moment().format("ddd MMM DD YYYY")) {
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
        else if (difference === 1) {
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

      //if there's 2-4 lwd and int is 0 (meaning it wasn't given by user)-->calculating cycle msg
      else if (waterData.length < 5 && int === 0){
        newButton.text("Calculating...");
        newButton.addClass("figuringCycle");            
      }

      //if there's 4 lwd and no int-->calc int, send int, then choose option from above
      else if (waterData.length === 5 && int === 0){
        let difference = 0;

        // find the difference btw lwd5 and 4, 4 and 3, 3 and 2
        // (lwd 1 is left out because it's the date the plant was added)
        // add the differences up
        for (let i=0; i<4; i++){
          console.log(waterData[i].createdAt);
          console.log(waterData);
          console.log(moment(waterData[i].createdAt).format("YYYY MM DD"))
          const waterDate = waterData[i].createdAt;
          
          let dayA = moment(waterData[i].createdAt).format("YYYY MM DD");
          let dayB = moment(waterData[i+1].createdAt).format("YYYY MM DD");
          // console.log(moment(waterDate, "YYYY MM DD"));
          console.log(dayA, dayB)
          dayA = moment(dayA, "YYYY MM DD");
          dayB = moment(dayB, "YYYY MM DD");
          const xxxx = dayA.diff(dayB, "days");
          console.log(xxxx);
          difference += moment(waterData[i].createdAt, "YYYY MM DD").diff(waterData[i+1].createdAt, "days");
          console.log(difference);
        }
        // divide by 3
        console.log(Math.round(difference/3));
        difference = Math.round(difference/3);
        if (difference === 0) {
          difference = 1;
        };
        console.log(data[i].plant_common_name);

        console.log(difference);

        // // send water_int to plants' table
        // $.put("/api/waterint/", {
        //   id: data[index].id,
        //   water_int: difference
        // }).then(function(data){
        // //congrats modal on myPlants page
        //   $("#congrats-msg-modal").text("Congrats! You've watered your plant four times. We've calculated this plant needs to be watered every " + newLastWatered + " days.");
        //   $("#congratsMsgModal").modal();
        //   // renderCards();
        // });
      }

      else {
        console.log("error");
      };

      newDiv2.append(newTitle);
      newDiv2.append(newButton);
      newDiv.append(newImg);
      newDiv.append(newDiv2);

      $("#myPlantsPage").prepend(newDiv);

// keep below
}
})
}

});