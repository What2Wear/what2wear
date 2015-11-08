var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');

var routes = require('./routes/index');
var users = require('./routes/users');
var config = require('./config');

var client = require('twilio')(config.accountSid, config.authToken);
var app = express();

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

temperature = function(temp){
  this.temp = temp;
  if(temp < 45)
    return "cold";
  else if(temp < 65)
    return "chilly";
  else if(temp < 70)
    return "comf";
  else if(temp < 80)
    return "warm";
  else return "hot";
}

w2w = function(temp, rain, snow, sunny) {
    this.temp = temp;
    this.rain = rain;
    this.snow = snow;
    this.sunny = sunny;
  var total;
  if(temp == "cold")
    total = "Wear: Jeans, Long Sleeved T-Shirt, and a Winter Coat";
  else if(temp == "chilly")
    total = "Wear: Jeans, Long Sleeved T-Shirt, and a Light/Fall Jacket";
  else if(temp == "comf")
    total = "Wear: Pants, Short Sleeved T-Shirt, and a Hoodie";
  else if(temp == "warm")
    total = "Wear: Pants and Short Sleeved T-Shirt";
  else if(temp == "hot")
    total = "Wear: Shorts and a Short Sleeved T-Shirt";
  if(rain) total += "\n"+"Bring: Umbrella";
  if(snow) total += "\n"+"Bring: Snow Boots";
  if(sunny) total += "\n"+"Bring: Sunglasses";
  return total;
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
      var temp = data.main.temp;
      var main = data.weather[0].main;
      var fTemp = Math.floor((temp*9/5) - 459.67);
      var comfortState = temperature(fTemp);

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

      var w = w2w(comfortState, r, s, sun);

      client.messages.create({
          body: "Thanks! \n| "+ w + "\n| " + fTemp + "\n| " + main + "\n| " + tID,
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
