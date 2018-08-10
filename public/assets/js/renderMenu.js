// renders the menu on add plant page
$(document).ready(function () {

  renderMenu();

  //add plants and ids to dropdown menu on addPlant page
  function renderMenu(){
    $.get("/api/masterPlants/", function(mData){
      for (var i=0; i<mData.length; i++){
        var newOption = $("<option>").text(mData[i].common_name).addClass("drop-down");
        newOption.attr({"value":mData[i].id});
        $("#drop-down").append(newOption);
      } 
    })
  };

});