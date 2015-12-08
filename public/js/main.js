$(document).ready(function(){
  $("#sign_up").click(function(e){
    e.preventDefault();
    var data = {};

    data["username"] = $("#username").val();
    data["phone"] = $("#phone").val();
    data["password"] = $("#password").val();
    data["gender"] = $("#gender").val();

    $.post("/addData", data);
    window.location = "/";
  });

  $("#sign_in").click(function(e){

  });
});
