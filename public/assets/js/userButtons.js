// button clicks associated with user login, logout and sign-up
$(document).ready(function() {
 
  // Getting references to our form and input
  var loginForm = $("form.login");
  var signUpForm = $("form.signup");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");
  var currentUserId;

  $("#loginPage").on("click", function(e){
    e.preventDefault();
    window.location.href="/login"
  });

  // $("#login-button").on("click", function(e){
  //   e.preventDefault();
  //   e.stopPropagation();
  //   console.log("im working!!");
  //   var newUser = {
  //     email:    $("#email-input").val(),
  //     password: $("#password-input").val()
  //   }
  //   console.log(newUser);
  //   return newUser;
  // });
  $("#login-button").on("click", function(event){
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }

    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(email, password) {
    $.post("/api/login", {
      email: email,
      password: password
    }).then(function(data) {
      window.location.replace(data);
      // If there's an error, log the error
    }).catch(function(err) {
      console.log(err);
    });
  }
  //button on the sign-up form
  // $("#sign-up-button").on("click", function(e){
  //   e.preventDefault();
  //   e.stopPropagation();
  //   console.log("Im working!!");
  //   var newUser = {
  //     email:    $("#email-input").val(),
  //     password: $("#password-input").val()
  //   }
  //   console.log(newUser);
  //   return newUser;
    
  //   $.ajax("/api/users", {
  //     type:"POST",
  //     data:newUser
  //   }).then(
  //     function(){
  //       window.location.href = "/myPlants";
  //     }
  //   )
  // });
  // When the signup button is clicked, we validate the email and password are not blank
  $("#sign-up-button").on("click", function(event){
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, password) {
    $.post("/api/signup", {
      email: email,
      password: password
    }).then(function(data) {
      window.location.replace(data);
      // If there's an error, handle it by throwing up a bootstrap alert
    }).catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }

  getUserId();
  function getUserId() {
    $.ajax("/api/user/", {
      type: "GET"
    })
    .then(function(data){
      currentUserId = data.id;
    });
  }
});
