//I don't know about node, twilio, and database, but algorithm works alongside the callback function
//Those two are the only ones I'm sure about that work
//Read finalAlgorithmUseThisOneYasha12-7.js to understand what may need to be changed and what it needs to work
//DELETE THESE COMMENTS ONCE YOU ARE DONE


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

//using gender to determine what clothes are in inventory
genderBasedClothing = function(sex){
  if(sex){
    top.push("dress");
    top.push("blouse");
    bottom.push("skirt");
  }
}
//assigns temp condition in string to temp
var getTemp = function(a){
  var b = [user.tempRules.cold, user.tempRules.chilly, user.tempRules.comf, user.tempRules.warm];
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
//determines the temperatures for which to wear each article of clothing
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
//decides what assessories to bring
var getExtras = function(r, s, sun){
    var extraString = "";
    if(r) extraString += "Bring: umbrella"+"\n";
    if(s) extraString += "Bring: snow boots"+"\n";
    if(sun) extraString += "Bring: sunglasses"+"\n";
    return extraString;
}
//gets next highest temp in case of nothing appropriate at current temperature
var tempNext = function(degree){
  if(degree == "cold")
    return "error";
  if(degree == "chilly")
    return "cold";
  if(degree == "comf")
    return "chilly";
  if(degree == "warm")
    return "hot";
  return "warm";
}
//gets previous temp in order to just wear something
var tempPrior = function(degree){
  if(degree == "cold")
    return "chilly";
  if(degree == "chilly")
    return "comf";
  if(degree == "comf")
    return "warm";
  if(degree == "warm")
    return "hot";
  return "error"; 
}
//find temp that can be used if optimal is not a possibility for upperwear
var notU = function(t){
  var a = false;
  var b = false;
  for(var i = 0; i < top.length; i++)
    if(top[i].indexOf(t) > -1) tempArr.push(top[i]);
  if(tempArr.length == 0 && !a){
    if(t == "error")
      a = true;
    else{
      t = tempNext(t);
      notU(t);
    }
  }
  if(tempArr.length == 0 && !b){
    if(t == "error")
      b = true;
    else{
      t = tempPrior(t);
      notU(t);
    }
  }
}
//find temp that can be used if optimal is not a possibility for lowerwear
var notL = function(t){
  var a = false;
  var b = false;
  for(var i = 0; i < bottom.length; i++)
    if(bottom[i].indexOf(temp) > -1) tempArr.push(bottom[i]);
  if(tempArr.length == 0 && !a){
    if(t == "error")
      a = true;
    else{
      t = tempNext(t);
      notL(t);
    }
  }
  if(tempArr.length == 0 && !b){
    if(t == "error")
      b = true;
    else{
      t = tempPrior(t);
      notL(t);
    }
  }
}
//find temp that can be used if optimal is not a possibility for outerwear
var notF = function(t){
  var a = false;
  var b = false;
  for(var i = 0; i < thick.length; i++)
    if(thick[i].indexOf(temp) > -1) tempArr.push(thick[i]);
  if(tempArr.length == 0 && !a){
    if(t == "error")
      a = true;
    else{
      t = tempNext(t);
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
  var temporary = "";
  if (lower != "" && fat != "")
    temporary = ("Wear: "+upper+", "+lower+", and "+fat)+"\n";
  else if(lower == "" && fat == "")
    temporary = ("Wear: "+upper)+"\n";
  else if(lower == "")
    temporary = ("Wear: "+upper+" and "+fat)+"\n";
  else temporary = "Wear: "+upper+" and "+lower+"\n";
  temporary += extras;
  return temporary;
}

//core thinking of program
w2w = function(){
  //assigning of variables
  {
    var d = new Date();
    var numberOfWeek = d.getDay(); //should give day of the week;
    var top = ["short-sleeved t-shirt", "shirt", "long-sleeved t-shirt"];
    var thick = ["winter coat", "light jacket", "hoodie", "sweater"];
    var bottom = ["pants", "shorts", "jeans"];
    var extras;
    var temp;
    var upper = "";
    var lower = "";
    var fat = "";
    var finalString;
    var zipcode= user.zipcode;
    var username = user.name;
    var gender = user.gender;
    var fTemp = 77;
    var phone = user.phone;
    var u = false;
    var l = false;
    var f = false;
  }
  //method calls
  {
    genderBasedClothing(gender);
    temp = getTemp(fTemp);
    tempForClothing();
    extras = getExtras(rain, snow, sunny);
  }
  var rare = "";
  var tempArr = [];
  //no extra layers when hot
  if(temp == "warm" || temp == "hot") f = true;
  notU(temp);
  rare = tempArr[Math.floor(Math.random()*tempArr.length)];
  rare = rare.substring(0, rare.indexOf(":"));
  upper = rare;
  if(upper == "dress") {
    l = true;
    lower = "";
  }
  tempArr = [];
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
  finalString = stri();
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
          body: "Thanks! \n| "+ finalString + "\n| " + fTemp + "\n| " + main + "\n| " + tID,
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