// logic for when user clicks 'water' button on plant cards. The water button data is created in renderCards.js
$(document).ready(function() {
  console.log("here")

  // get current user's id for posting data later
  var currentUserId;
  getUserId();
  function getUserId() {
    $.ajax("/api/user/", {
      type: "GET"
    })
    .then(function(data){
      currentUserId = data.id;
    });
  };

  //clicking "watered" button gives happy message modal; the btn trigger for this is on myPlants page
  $(document).on("click", "#happyMsgModal", function () {}); 

  //clicking "water now" button changes it to "watered"
  $(document).on("click", ".waterNowBtn", function () {
    $(this).removeClass("waterNowBtn");
    $(this).addClass("feelGoodMsg");//need this?
    $(this).attr("data-toggle", "modal");
    $(this).attr("data-target", "#happyMsgModal");
    $(this).text("Watered");
    //need to remove these classes later
    //data-toggle="modal" data-target="#exampleModal"> 

    var newLastWatered=moment().format("YYYY-MM-DD");
    var id = this.id;
    console.log(id);
    var newPost={
      PlantId: id,
      UserId: currentUserId,
      last_watered_date: newLastWatered,
      // neverWatered: false
    };
    updatePlantLwd(newPost);
  });

    // post a new lwd to db with the current date
    // this adds an additional lwd. it does NOT change the lwd
    function updatePlantLwd(newPost){
    $.ajax("/api/lastWatered/", {
      type:"POST",
      data:newPost
    })
  };

  // clicking "figuring cycle" button starts calculating and sends msg with directions
  // this is only valid for plants with no water_int and less than 5 last_watereds
  $(document).on("click", ".figuringCycle", function () {
    console.log(this);
    var button = this;
    $.get("/api/lastWatered/"+this.id, function(data){
      var newWaterInt; // for plant table
console.log(data.length);
      // if there's less than 5 lastWatered and no water_int, 
      // post the new water date to lastWatered table
      if (data.length < 5){
        var dataToPost = {
          UserId: currentUserId,
          PlantId: data[0].PlantId
        };
        $.ajax("/api/lastWatered",{
          type: "POST",
          data: dataToPost
        }).then(
          function(data){
            console.log("here");
            console.log(data);
            // $("#congratsMsgModal").modal();
          }
        );        
      }
      //if there are 4 lastWatereds (the first is the initial), change btn and average is calculated in renderCards.js
      else {
        // console.log("error");
        // console.log(this);
        $(button).removeClass("figuringCycle");
        // $(this).addClass("feelGoodMsg");//need this?
        // var add = parseInt(data.lwd1) + parseInt(data.lwd2) + parseInt(data.lwd3) + parseInt(data.lwd4);
        // newWaterInt = Math.round(add / 4);
        // var newPost={
        //   id: this.id,
        //   plant_water_int: newWaterInt
        // };
        // updateWaterInt(newPost);

        // //congrats modal on myPlants page
        // $("#congrats-msg-modal").text("Congrats! You've watered your plant four times. We've calculated this plant needs to be watered every " + newLastWatered + " days.");
        // $("#congratsMsgModal").modal();

        // // push notification practice - congrats msg
        // UA.then(function(sdk) {
        //   console.log("here");
        //   console.log(sdk.channel.id)
        // }).catch(function(err) {
        //   console.log("err");
        //   console.log(err)
        // });
        
        // // Multiple calls have no additional expense.
        // UA.then(function(sdk) {
        //   console.log("here");
        //   $('#register').show();
        //   $('#register').click(function(ev) { sdk.register() });
        // });

        //put lwd1, 2, 3, 4 to null in lastwatered table
        //need api call to do this!!!!!!!!!!


        //update last_watered_date in plant table
        // function updateWaterInt(newPost){
        //   $.ajax("/api/plants"+newPost.id,{
        //     type:"PUT",
        //     data:newPost
        //   })
        // };

      }

      // //post (for first time) lwd1, 2, 3, or 4 to lastwatered table
      // function postdata(c){
      //   $.ajax("/api/lastWatered/Update",{
      //     type:"POST",
      //     data:newWaterDate
      //   }).then(
      //     function(){
      //       console.log("here");
      //       console.log(c);
      //       $("#congratsMsgModal").modal();
      //     }
      //   );        
      // };

    });
  });

  //this doesn't work
  //clicking "x days left" gives option to restart the water cycle, recalcuate the days, or delete the plant
  $(document).on("click", "changeCycleBtn", function () {
    console.log(this);

    $("#congrats-msg-modal").text("You have " + this.days + " left.<br>Want some options?<br>");

    var newBtn = $("<button>");
    newBtn.text("Do you want to water it now and restart the cycle?");
    newBtn.attr("id", this.id);
    newBtn.addClass("restartBtn btn btn-outline-dark px-6 mt-3");

    var newBtn2 = $("<button>");
    newBtn2.text("Delete this plant from your My Plants page?");
    newBtn2.attr("id", this.id);
    newBtn2.addClass("deleteBtn btn btn-outline-dark px-6 mt-3");

    var newBtn3 = $("<button>");
    newBtn3.text("Do you want to recalculate the amount of days between waterings?");
    newBtn3.attr("id", this.id);
    newBtn3.addClass("recalculateBtn btn btn-outline-dark px-6 mt-3");

    $("#change-msg-modal").append(newBtn, newBtn2, newBtn3);

    $("#changeMsgModal").modal();
  });

  $(document).on("click", "#restartBtn", function () {
    console.log(this);
    $().removeClass(".restartBtn");
    $().addClass(".waterNowBtn");
    //send ajax call to change last watered date
    //change text to water now
  });

  //delete the plant from the user's app
  $(document).on("click", ".deleteBtn", function () {
    $.ajax("")
  });

  //recalculate the days between waterings
  $(document).on("click", ".recalculateBtn", function () {
    $().removeClass(".recalculateBtn");
    $().addClass(".figuringCycle");
  });

});//end doc.ready