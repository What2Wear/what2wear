//var Firebase = require("firebase");
//var ref = new Firebase("https://what2wear.firebaseio.com/");
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var MongoClient = require('mongodb').MongoClient;

var routes = require('./routes/index');
var users = require('./routes/users');
var config = require('./config');

var client = require('twilio')(config.accountSid, config.authToken);
var app = express();

var MONGO_URL = "mongodb://what:2wear@ds039504.mongolab.com:39504/documents";
var COLL_NAME = "documents";

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('port', process.env.PORT || 3000);

app.use('/', routes);
app.use('/users', users)

var userRef = ref.child("users");
var d = new Date();
var numberOfWeek = d.getDay(); //should give day of the week;
var top = ["short-sleeved t-shirt", "shirt", "long-sleeved t-shirt"];
var thick = ["winter coat", "light jacket", "hoodie", "sweater"];
var bottom = ["pants", "shorts", "jeans"];
var dayOfTheWeekRules = [[],[],[],[],[],[],[]];
var comfortableTemperatureRules = [55, 70, 77, 83];
var numberOfWeek;
var extras;
var rulesOfDay;
var temp;
var upper = "";
var lower = "";
var fat = "";
var toStringIsh;
var zipcode;
var username;
var gender;
var phone;

app.post("/addData", function(req, res, next){
  var username = req.body.username;
  var gender = req.body.gender;
  var zip = req.body.zip;
  var phone = req.body.phone;

  MongoCLient.connect(MONGO_URL, function(err, db){
    if (err) throw err;
    console.log("Mongo connected.");

    var collection = db.collection(COLL_NAME);

    collection.insert({
      username: username,
      gender: gender,
      zip: zip,
      phone: phone
    }, function(err, result){
      if (err) throw err;
      console.log(result);
    });
  });

});
/*
var addData = function(thanksFrontend) {
  var Niger;
  if(thanksFrontend.gender == 'female')
    Niger = true;
  else Niger = false;
  userRef.set({
    users: thanksFrontend.name: {
      zip: thanksFrontend.zip,
      gender: Niger,
      phone: thanksFrontend.phone,
    }
  });
}
var updateData = function(zongyiWang) {
  var Niger;
  if(thanksFrontend.gender == 'female')
    Niger = true;
  else Niger = false;
  userRef.set({
    users: thanksFrontend.name: {
      zip: thanksFrontend.zip,
      gender: Niger,
      phone: thanksFrontend.phone,
    }
  });
}
var getData = function(whet3were) {
  username = whet3were;
  zipcode = whet3were.zip;
  gender = whet3were.gender;
  phone = whet3were.phone;
}
*/



//using gender to determine what clothes are in inventory
genderBasedClothing = function(sex){
  if(sex){
    top.push("dress");
    top.push("blouse");
    bottom.push("skirt");
  }
}
//assigns temp condition in string to temp
var getTemp = function(a, b){
  if(a < b[0])
      return "cold";
    else if(a < b[1])
      return "chilly";
    else if(a < b[2])
      return "comf";
    else if(a < b[3])
      return "warm";
    else return "hot";
}
//decides what assessories to bring
var getExtras = function(r, s, sun){
    var e = "";
    if(r) e += "Bring: umbrella"+"\n";
    if(s) e += "Bring: snow boots"+"\n";
    if(sun) e += "Bring: sunglasses"+"\n";
    return e;
}
//actual string at the end
var stri = function(){
  var eee = "";
  if (lower != "" && fat != "")
    eee = ("Wear: "+upper+", "+lower+", and "+fat)+"\n";
  else if(lower == "" && fat == "") 
    eee = ("Wear: "+upper)+"\n";
  else if(lower == "")
    eee = ("Wear: "+upper+" and "+fat)+"\n";
  else eee = "Wear: "+upper+" and "+lower+"\n";
  eee += extras;
}
//core thinking of program
w2w = function(){
  //assigning of variables
  {
    var u = false;
    var l = false;
    var f = false;
    genderBasedClothing(gender);
    temp = getTemp(t, comfortableTemperatureRules);
    extras = getExtras(rain, snow, sunny);
    rulesOfDay = dayOfTheWeekRules[numberOfWeek];
  }
  //determines where each type of clothing is worn
  {
    for(var i = 0; i < dayOfTheWeekRules[numberOfWeek].length; i++){  
      for(var j = 0; j < bottom.length; j++){
        if(dayOfTheWeekRules[numberOfWeek][i] == bottom[j])
          dayOfTheWeekRules[numberOfWeek][i] += ": bottom";
      }
      for(var j = 0; j < top.length; j++){
        if(dayOfTheWeekRules[numberOfWeek][i] == top[j])
          dayOfTheWeekRules[numberOfWeek][i] += ": top";
      }
      for(var j = 0; j < thick.length; j++){
        if(dayOfTheWeekRules[numberOfWeek][i] == thick[j])
          dayOfTheWeekRules[numberOfWeek][i] += ": thick";
      }
    }
  }
  //determines the temperature for which to wear the clothing
  {
    for(var i = 0; i < top.length; i++) {
      if(top[i] == "long-sleeved t-shirt")
        top[i] += ": cold chilly comf";
      else if(top[i] == "short-sleeved t-shirt")
        top[i] += ": comf warm hot";
      else if(top[i] == "blouse")
        top[i] += ": warm hot";
      else if(top[i] == "dress")
        top[i] += ": hot";
    } 
    for(var i = 0; i < thick.length; i++){
      if(thick[i] == "winter coat")
        thick[i] += ": cold";
      else if(thick[i] == "light jacket")
        thick[i] += ": chilly";
      else if(thick[i] == "hoodie")
        thick[i] += ": chilly comf";
      else if(thick[i] == "sweater")
        thick[i] += ": comf";
    }
    for(var i = 0; i < bottom.length; i++){
      if(bottom[i] == "jeans")
        bottom[i] += ": cold chilly comf";
      else if(bottom[i] == "sweatpants")
        bottom[i] += ": cold chilly";
      else if(bottom[i] == "pants")
        bottom[i] += ": chilly comf";
      else if(bottom[i] == "skirt")
        bottom[i] += ": warm";
      else if(bottom[i] == "shorts")
        bottom[i] += ": warm hot";
    }
  }
  var rare = "";
  var tempArr = [];
  if(temp == "warm" || temp == "hot") f = true;
  for(var i = 0; i < rulesOfDay.length; i++) {
    if(rulesOfDay[i].substring(rulesOfDay[i].length-5,rulesOfDay[i].length) == ": top"){
      rare = rulesOfDay[i].substring(0, rulesOfDay[i].length-5);
      upper = rare;
      if(rare == "dress") {
        l = true;
        lower = "";
      }
      u = true;
    }
    else if(rulesOfDay[i].substring(rulesOfDay[i].length-7,rulesOfDay[i].length) == ": thick"){
      fat = rulesOfDay[i].substring(0, rulesOfDay[i].length-7);
      f = true;
    }
    else if(rulesOfDay[i].substring(rulesOfDay[i].length-8, rulesOfDay[i].length) == ": bottom"){
      lower = rulesOfDay[i].substring(0, rulesOfDay[i].length-8);
      l = true;
    }
  }
  if(!u){
    for(var i = 0; i < top.length; i++) {
      if(top[i].indexOf(temp) > -1) tempArr.push(top[i]);
    }
    rare = tempArr[Math.floor(Math.random()*tempArr.length)];
    rare = rare.substring(0, rare.indexOf(":"));
    upper = rare;
    if(upper == "dress") {
      l = true;
      lower = "";
    }
    tempArr = [];
  }
  if(!l){
    for(var i = 0; i < bottom.length; i++) {
      if(bottom[i].indexOf(temp) > -1) tempArr.push(bottom[i]);
    }
    lower = tempArr[Math.floor(Math.random()*tempArr.length)];
    lower = lower.substring(0, lower.indexOf(":"));
    tempArr = [];
  }
  if(!f){
    for(var i = 0; i < thick.length; i++) {
      if(thick[i].indexOf(temp) > -1) tempArr.push(thick[i]);
    }
    fat = tempArr[Math.floor(Math.random()*tempArr.length)];
    fat = fat.substring(0, fat.indexOf(":"));
    tempArr = [];
  }
  toStringIsh = stri();
}


app.post('/request', function(req, res, next){
  var message = req.body.Body;
  var from = req.body.From;
  console.log('From: ' + from + ', Message: ' + message);
  // var twiml = '<?xml version="1.0" encoding="UTF-8" ?>n<Response>n<Sms>Thanks for your text, we\'ll be in touch.</Sms>n</Response>';
   
  // res.send(twiml, {'Content-Type':'text/xml'}, 200);

  // assume they send a zipcode
  // var reqPath = "/data/2.5/weather?zip="+message+",us";
  // var reqPath = "/data/2.5/weather?zip=61801,us";
  var options = {
    host: 'api.openweathermap.org',
    path: '/data/2.5/weather?zip='+message+',us'
  };

  callback = function(response)
  {
    var str = '';

    //another chunk of data has been recieved, so append it to `str`
    response.on('data', function (chunk) {
      str += chunk;
    });

    //the whole response has been recieved, so we just print it out here
    response.on('end', function () {
      console.log(str);
      // res.send(JSON.parse(str));
      var data = JSON.parse(str);
      var tID = data.weather[0].id;
      var tempu = data.main.temp;
      var main = data.weather[0].main;
      var fTemp = Math.floor((tempu*9/5) - 459.67);
      var comfortState = getTemp(fTemp);

      var r = false;
      var s = false;
      var sun = false;

      if ((tID==800)||(tID==801))
      {
        sun = true;
      }
      if (Math.floor(tID/100)==6)
      {
        s = true;
      }
      if ((Math.floor(tID/100)==5)||(Math.floor(tID/100)==3)||(Math.floor(tID/100)==2))
      {
        r = true;
      }

      w2w();

      client.messages.create({
          body: "Thanks! \n| "+ toStringIsh + "\n| " + fTemp + "\n| " + main + "\n| " + tID,
          to: from,
          from: "+13313056064"
      }, function(err, message) {
          process.stdout.write(message.sid);
          console.log("\ndone\n");
      });
      res.write('done');
      res.end();
    });
  }

  http.request(options, callback).end();
  //get weather
  // http.get({
  //   host: 'api.openweathermap.org',
  //   path: reqPath
  //   }, function(response) {
  //     var str = '';

  //     //another chunk of data has been recieved, so append it to `str`
  //     response.on('data', function (chunk) {
  //       str += chunk;
  //     });

  //     //the whole response has been recieved, so we just print it out here
  //     response.on('end', function () {
  //       console.log(str);
  //     });
  //     // console.log(response);
  // });
  // client.messages.create({
  //     body: "Thanks! "+ message,
  //     to: from,
  //     from: "+13313056064"
  // }, function(err, message) {
  //     process.stdout.write(message.sid);
  // });
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


 
// client.messages.create({
//     body: "MESSAGE FROM TWILIO!",
//     to: "+16303037034",
//     from: "+13313056064"
// }, function(err, message) {
//     process.stdout.write(message.sid);
// });

app.listen(app.get('port'), function() {
  console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});

module.exports = app;