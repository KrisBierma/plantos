// button clicks from 'add plant' page: add plant, cancel add plant, submit plant
$(document).ready(function() {

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

  //addPlantBtn
  $("#addPlantBtn").on("click", function(){
    window.location.href="/addPlant"
  });

  //cancelAddPlantBtn
  $("#cancelAddPlantBtn").on("click", function(e){
    e.preventDefault();
    window.location.href="/myPlants"
  });

  $("#submitPlant").on("click", function(e){
    e.preventDefault();

    //get form data from add a plant
    //OR get info from drop-down menu
    var waterInt = $("#wateringNeedsInt").val().trim();
    if (waterInt === ""){
      waterInt = 0;
    }

    //get masterId value from dropdown menu
    var masterPlantId = $("#drop-down").val();
    if (masterPlantId === ""){
      masterPlantId = 0;
    };

    // the 'default select' in the drop down menu is given -1 value
    // if 'default select', check the input fields
    if ($(".form-control").val() == -1){
      // if enough info is filled out, the plant is added to the user
      if ($("#commonName").val().trim() !=="" && ($("#wateringNeedsText").val().trim() !== "" || $("#wateringNeedsInt").val().trim() !== "")){

        var newPlant = {
          plant_common_name: $("#commonName").val().trim(),
          plant_water_text: $("#wateringNeedsText").val().trim() || null,
          sun_placement: $("#sunNeeds").val(),
          pet_friendly: $("#petFriendly").val(),
          plant_water_int: waterInt,
          plant_scientific_name: $("#scientificName").val().trim() || null,
          image_url: "https://wenkegardencenter.com/wp-content/uploads/2016/12/house-plants.jpg",
          UserId: currentUserId,
        };

        // post the user-entered data to db and send user to myPlants page
        $.ajax("/api/plants", {
          type:"POST",
          data:newPlant
          }).then(
            function(data){
              var lastWatered = {
                UserId: currentUserId,
                PlantId: data.id,
                // neverWatered: true
              }
              // post data to lastWatered so cards render with info
              $.ajax("/api/lastWatered/", {
                type: "POST",
                data: lastWatered,
              }).then(
                function(){
                  window.location.href = "/myPlants";
                }
              )
            }
          ); 
        }
      // but if the form doesn't have enough info, show "needInfo" modal and keep user on current page
      // the modal is on the "addPlant" page
      else{
        $("#needInfoMsgModal").modal("show");
      };
    } 
    // if form value isn't -1, gather info from drop-down menu 
    else {
      $.ajax("/api/masterPlants/" + masterPlantId, {
        method: "GET"
      })
      .then(function(data){
        var newPlant = {
          plant_common_name: data.common_name,
          plant_water_text: data.water_text,
          sun_placement: data.sun_placement,
          pet_friendly: data.pet_friendly,
          plant_water_int: data.water_int,
          plant_scientific_name: data.scientific_name,
          image_url: data.image_url,
          UserId: currentUserId,
        };

        // send master plant info from drop-down menu to db and send user to myPlants page
        $.ajax("/api/plants", {
          type:"POST",
          data:newPlant
          }).then(
            function(data) {
              var lastWatered = {
                UserId: currentUserId,
                PlantId: data.id,
                // neverWatered: true
              }
            $.ajax("/api/lastWatered/", {
              type: "POST",
              data: lastWatered,
            }).then(
              function(){
                window.location.href = "/myPlants";
              }
            )}
          ); 
      });
    };
  }); // end submit button function

});