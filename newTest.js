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

app.post("/addData", function(req, res, next){
  var username = req.body.username;
  var gender = req.body.gender;
  var zip = req.body.zip;
  var phone = req.body.phone;
  var password = req.body.password;

  MongoClient.connect(MONGO_URL, function(err, db){
    if (err) throw err;
    console.log("Mongo connected.");

    var collection = db.collection(COLL_NAME);

    collection.insert({
      username: username,
      gender: gender,
      zip: zip,
      phone: phone,
      password: password
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

//make top array
var makeTop = function(){
  var a = [];
  if(user.inventory.shortSleeves > 0){
    for(int i = user.inventory.shortSleeves; i != 0; i--)
      a.push("short-sleeved t-shirt");
  }
  if(user.inventory.longSleeved > 0){
    for(int i = user.inventory.longSleeved; i!=0; i--)
      a.push("long-sleeved t-shirt");
  }
  if(user.inventory.shirt > 0){
    for(int i = user.inventory.shirt; i!=0; i--)
      a.push("shirt");
  }
  if(user.inventory.blouse > 0){
    for(int i = user.inventory.blouse; i!=0; i--)
      a.push("blouse");
  }
  if(user.inventory.dress > 0){
    for(int i = user.inventory.dress; i!=0; i--)
      a.push("dress");
  }
  return a;
}
//make thick array
var makeThick = function(){
  var a = [];
  if(user.inventory.winterCoat)
    a.push("winter coat");
  if(user.inventory.hoodie)
    a.push("hoodie");
  if(user.inventory.sweater)
    a.push("sweater");
  if(user.inventory.lightJacket)
    a.push("light jacket");
  return a;
}
//make bottom array
var makeBottom = function() {
  var a = [];
  if(user.inventory.pants){
    for(int i = user.inventory.pants; i!=0; i--)
      a.push("pants");
  }
  if(user.inventory.shorts){
    for(int i = user.inventory.shorts; i!=0; i--)
      a.push("shorts");
  }
  if(user.inventory.jeans){
    for(int i = user.inventory.jeans; i!=0; i--)
      a.push("jeans");
  }
  if(user.inventory.skirt){
    for(int i = user.inventory.skirt; i!=0; i--)
      a.push("skirt");
  }
  return a;
}
//determines where each type of clothing is worn
var determineLocation = function(){
  for(var i = 0; i < rulesOfDay.length; i++){
      for(var j = 0; j < bottom.length; j++){
        if(rulesOfDay[i] == bottom[j])
          rulesOfDay[i] += ": bottom";
      }
      for(var j = 0; j < top.length; j++){
        if(rulesOfDay[i] == top[j])
          rulesOfDay[i] += ": top";
      }
      for(var j = 0; j < thick.length; j++){
        if(rulesOfDay[i] == thick[j])
          rulesOfDay[i] += ": thick";
      }
    }
}
//assigns temp condition in string to temp
var getTemp = function(a){
  var b = [user.tempRules.cold, user.tempRules.chilly, user.tempRules.comf, user.tempRules.warm, user.tempRules.hot];
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
//determines the temperature for which to wear the clothing
var tempForClothing = function() {
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
    for(var i = 0; i < b.length; i++){
      if(b[i] == "jeans")
        b[i] += ": cold chilly comf";
      else if(b[i] == "sweatpants")
        b[i] += ": cold chilly";
      else if(b[i] == "pants")
        b[i] += ": chilly comf";
      else if(b[i] == "skirt")
        b[i] += ": warm";
      else if(b[i] == "shorts")
        b[i] += ": warm hot";
    }
}
//decides what assessories to bring
var getExtras = function(r, s, sun){
    var e = "";
    if(r) e += "Bring: umbrella"+"\n";
    if(s) e += "Bring: snow boots"+"\n";
    if(sun) e += "Bring: sunglasses"+"\n";
    return e;
}
//gets next highest temp
var tempPrior = function(var t){
  if(t == "cold")
    return "error";
  if(t == "chilly")
    return "cold";
  if(t == "comf")
    return "chilly";
  if(t == "warm")
    return "hot";
  return "warm";
}
//gets previous temp
var tempNext = function(var t){
  if(t == "cold")
    return "chilly";
  if(t == "chilly")
    return "comf";
  if(t == "comf")
    return "warm";
  if(t == "warm")
    return "hot";
  return "error"; 
}
var notU = function(var t){
  var a = false;
  var b = false;
  for(var i = 0; i < top.length; i++)
    if(top[i].indexOf(t) > -1) tempArr.push(top[i]);
  if(tempArr.length == 0 && !a){
    if(t == "error")
      a = true;
    else{
      t = tempPrior(t);
      notU(t);
    }
  }
  if(tempArr.length == 0 && !b){
    if(t == "error")
      b = true;
    else{
      t = tempNext(t);
      notU(t);
    }
  }
}
var notL = function(var t){
  var a = false;
  var b = false;
  for(var i = 0; i < bottom.length; i++)
    if(bottom[i].indexOf(temp) > -1) tempArr.push(bottom[i]);
  if(tempArr.length == 0 && !a){
    if(t == "error")
      a = true;
    else{
      t = tempPrior(t);
      notL(t);
    }
  }
  if(tempArr.length == 0 && !b){
    if(t == "error")
      b = true;
    else{
      t = tempNext(t);
      notL(t);
    }
  }
}
var notF = function(var t){
  var a = false;
  var b = false;
  for(var i = 0; i < thick.length; i++)
    if(thick[i].indexOf(temp) > -1) tempArr.push(thick[i]);
  if(tempArr.length == 0 && !a){
    if(t == "error")
      a = true;
    else{
      t = tempPrior(t);
      notF(t);
    }
  }
  if(tempArr.length == 0 && !b){
    if(t == "error")
      a = true;
    else{
      t = tempPrior(t);
      notF(t);
    }
  }
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
    var d = new Date();
    var numberOfWeek = d.getDay(); //should give day of the week;
    //var top = ["short-sleeved t-shirt", "shirt", "long-sleeved t-shirt"];
    //var thick = ["winter coat", "light jacket", "hoodie", "sweater"];
    //var bottom = ["pants", "shorts", "jeans"];
    var top;
    var bottom;
    var thick;
    var dayOfTheWeekRules = [[user.dayRules.monday],[user.dayRules.tuesday],[user.dayRules.wednesday],[user.dayRules.thursday],[user.dayRules.friday],[user.dayRules.saturday],[user.dayRules.sunday]];
    //var comfortableTemperatureRules = [45, 65, 75, 85];
    var extras;
    var rulesOfDay;
    var temp;
    var upper = "";
    var lower = "";
    var fat = "";
    var toStringIsh;
    var zipcode= user.zipcode;
    var username = user.name;
    var gender = user.gender;
    var phone = user.phone;
    var u = false;
    var l = false;
    var f = false;
  }
  //method calls
  {
    //genderBasedClothing(gender);
    top = makeTop();
    bottom = makeBottom();
    thick = makeThick();
    temp = getTemp(t);
    rulesOfDay = dayOfTheWeekRules[numberOfWeek];
    determineLocation();
    tempForClothing();
    extras = getExtras(rain, snow, sunny);
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
    notU(temp);
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
    notL(temp);
    lower = tempArr[Math.floor(Math.random()*tempArr.length)];
    lower = lower.substring(0, lower.indexOf(":"));
    tempArr = [];
  }
  if(!f){
    notF(temp);
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

      var rain = false;
      var snow = false;
      var sunny = false;

      if ((tID==800)||(tID==801))
      {
        sunny = true;
      }
      if (Math.floor(tID/100)==6)
      {
        snow = true;
      }
      if ((Math.floor(tID/100)==5)||(Math.floor(tID/100)==3)||(Math.floor(tID/100)==2))
      {
        rain = true;
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
