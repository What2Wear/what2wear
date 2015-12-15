var _ = require('underscore');
var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var passport = require('passport');
var User = require('../models/User');
var secrets = require('../config/secrets');
var what2wearController = require('../config/what2wear');
var http = require('http');
var client = require('twilio')(secrets.twilio.sid, secrets.twilio.token);

/**
* GET /what2wear
* provides user what2wear
*/
exports.getwhat2wear = function(req, res)
{
  if (req.user)
  {

    var isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(req.user.profile.location);
    var validPreferences = req.user.profile.cold != "" && req.user.profile.chilly != "" && req.user.profile.comf != "" && req.user.profile.warm != "";

    if (isValidZip && validPreferences)
    {
      var options = {
        host: 'api.openweathermap.org',
        path: '/data/2.5/weather?zip='+req.user.profile.location+',us&APPID=fcea7f4623776b63cfdc51b2fab81310'
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
          var data = JSON.parse(str);
          var tID = data.weather[0].id;
          var tempu = data.main.temp;
          var main = data.weather[0].main;
          var fTemp = Math.floor((tempu*9/5) - 459.67);
          var comfortState = temperature_old(fTemp);

          var rain = false;
          var snow = false;
          var sun = false;

          if ((tID==800)||(tID==801))
          {
            sun = true;
          }
          if (Math.floor(tID/100)==6)
          {
            snow = true;
          }
          if ((Math.floor(tID/100)==5)||(Math.floor(tID/100)==3)||(Math.floor(tID/100)==2))
          {
            rain = true;
          }

          // var w = w2w_old(comfortState, r, s, sun);
          var gender = (req.user.profile.gender == "female");
          var w = what2wearController.w2w(fTemp, gender, rain, snow, sun, req.user.profile.cold, req.user.profile.chilly, req.user.profile.comf, req.user.profile.warm);

          res.render('account/what2wear', {
            title: 'What 2 Wear',
            what2wear: w,
            temp: fTemp,
            main: main,
            tID: tID
          });
        });
      }

      http.request(options, callback).end();
    }
    else {
      res.redirect('/account');
      // req.flash('error', { msg: 'Profile not properly updated.' });
      // req.flash('error', { msg: 'Profile not properly updated.' });
    }
  }
  else {
    res.render('account/login', {
      title: 'Login'
    });
  }
}

exports.textme = function(req, res, next) {
  var number = req.body.number;

  var options = {
    host: 'api.openweathermap.org',
    path: '/data/2.5/weather?zip='+req.user.profile.location+',us&APPID=fcea7f4623776b63cfdc51b2fab81310'
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
      var comfortState = temperature_old(fTemp);

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

      var w = w2w_old(comfortState, r, s, sun);

      res.render('account/what2wear', {
        title: 'What 2 Wear',
        what2wear: w,
        temp: fTemp,
        main: main,
        tID: tID
      });


      client.messages.create({
          body: "Here you go:\n| "+ w + "\n| " + fTemp + "\n| " + main + "\n| " + tID,
          to: number,
          from: "+13313056064"
      }, function(err, message) {
          process.stdout.write(message.sid);
          console.log("\ndone\n");
          if (err) return next(err);
      });
      req.flash('success', { msg: 'Message sent!' });
      res.redirect('/');
    });
  }

  http.request(options, callback).end();
};

temperature_old = function(temp){
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

w2w_old = function(temp, rain, snow, sunny) {
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

/**
 * GET /login
 * Login page.
 */

exports.getLogin = function(req, res) {
  if (req.user) return res.redirect('/');
  res.render('account/login', {
    title: 'Login'
  });
};

/**
 * POST /login
 * Sign in using email and password.
 * @param email
 * @param password
 */

exports.postLogin = function(req, res, next) {
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('password', 'Password cannot be blank').notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/login');
  }

  passport.authenticate('local', function(err, user, info) {
    if (err) return next(err);
    if (!user) {
      req.flash('errors', { msg: info.message });
      return res.redirect('/login');
    }
    req.logIn(user, function(err) {
      if (err) return next(err);
      req.flash('success', { msg: 'Success! You are logged in.' });
      res.redirect(req.session.returnTo || '/');
    });
  })(req, res, next);
};

/**
 * GET /logout
 * Log out.
 */

exports.logout = function(req, res) {
  req.logout();
  res.redirect('/');
};

/**
 * GET /signup
 * Signup page.
 */

exports.getSignup = function(req, res) {
  if (req.user) return res.redirect('/');
  res.render('account/signup', {
    title: 'Create Account'
  });
};

/**
 * POST /signup
 * Create a new local account.
 * @param email
 * @param password
 */

exports.postSignup = function(req, res, next) {
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('password', 'Password must be at least 4 characters long').len(4);
  req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);

  var errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/signup');
  }

  var user = new User({
    email: req.body.email,
    password: req.body.password
  });

  user.save(function(err) {
    if (err) {
      if (err.code === 11000) {
        req.flash('errors', { msg: 'User with that email already exists.' });
      }
      return res.redirect('/signup');
    }
    req.logIn(user, function(err) {
      if (err) return next(err);
      res.redirect('/account');
    });
  });
};

/**
 * GET /account
 * Profile page.
 */

exports.getAccount = function(req, res) {
  res.render('account/profile', {
    title: 'Account Management'
  });
};

/**
 * POST /account/profile
 * Update profile information.
 */

exports.postUpdateProfile = function(req, res, next) {
  User.findById(req.user.id, function(err, user) {
    if (err) return next(err);
    user.email = req.body.email || '';
    user.profile.name = req.body.name || '';
    user.profile.gender = req.body.gender || '';
    user.profile.location = req.body.location || '';
    user.profile.website = req.body.website || '';

    user.profile.cold = req.body.cold || '';
    user.profile.chilly = req.body.chilly || '';
    user.profile.comf = req.body.comf || '';
    user.profile.warm = req.body.warm || '';

    console.log(user);

    user.save(function(err) {
      if (err) return next(err);
      req.flash('success', { msg: 'Profile information updated.' });
      res.redirect('/account');
    });
  });
};

/**
 * POST /account/password
 * Update current password.
 * @param password
 */

exports.postUpdatePassword = function(req, res, next) {
  req.assert('password', 'Password must be at least 4 characters long').len(4);
  req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);

  var errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/account');
  }

  User.findById(req.user.id, function(err, user) {
    if (err) return next(err);

    user.password = req.body.password;

    user.save(function(err) {
      if (err) return next(err);
      req.flash('success', { msg: 'Password has been changed.' });
      res.redirect('/account');
    });
  });
};

/**
 * POST /account/delete
 * Delete user account.
 * @param id - User ObjectId
 */

exports.postDeleteAccount = function(req, res, next) {
  User.remove({ _id: req.user.id }, function(err) {
    if (err) return next(err);
    req.logout();
    res.redirect('/');
  });
};

/**
 * GET /account/unlink/:provider
 * Unlink OAuth2 provider from the current user.
 * @param provider
 * @param id - User ObjectId
 */

exports.getOauthUnlink = function(req, res, next) {
  var provider = req.params.provider;
  User.findById(req.user.id, function(err, user) {
    if (err) return next(err);

    user[provider] = undefined;
    user.tokens = _.reject(user.tokens, function(token) { return token.kind === provider; });

    user.save(function(err) {
      if (err) return next(err);
      req.flash('info', { msg: provider + ' account has been unlinked.' });
      res.redirect('/account');
    });
  });
};

/**
 * GET /reset/:token
 * Reset Password page.
 */

exports.getReset = function(req, res) {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }

  User
    .findOne({ resetPasswordToken: req.params.token })
    .where('resetPasswordExpires').gt(Date.now())
    .exec(function(err, user) {
      if (!user) {
        req.flash('errors', { msg: 'Password reset token is invalid or has expired.' });
        return res.redirect('/forgot');
      }
      res.render('account/reset', {
        title: 'Password Reset'
      });
    });
};

/**
 * POST /reset/:token
 * Process the reset password request.
 */

exports.postReset = function(req, res, next) {
  req.assert('password', 'Password must be at least 4 characters long.').len(4);
  req.assert('confirm', 'Passwords must match.').equals(req.body.password);

  var errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('back');
  }

  async.waterfall([
    function(done) {
      User
        .findOne({ resetPasswordToken: req.params.token })
        .where('resetPasswordExpires').gt(Date.now())
        .exec(function(err, user) {
          if (!user) {
            req.flash('errors', { msg: 'Password reset token is invalid or has expired.' });
            return res.redirect('back');
          }

          user.password = req.body.password;
          user.resetPasswordToken = undefined;
          user.resetPasswordExpires = undefined;

          user.save(function(err) {
            if (err) return next(err);
            req.logIn(user, function(err) {
              done(err, user);
            });
          });
        });
    },
    function(user, done) {
      var smtpTransport = nodemailer.createTransport('SMTP', {
        service: 'SendGrid',
        auth: {
          user: secrets.sendgrid.user,
          pass: secrets.sendgrid.password
        }
      });
      var mailOptions = {
        to: user.email,
        from: 'hackathon@starter.com',
        subject: 'Your Hackathon Starter password has been changed',
        text: 'Hello,\n\n' +
          'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        req.flash('success', { msg: 'Success! Your password has been changed.' });
        done(err);
      });
    }
  ], function(err) {
    if (err) return next(err);
    res.redirect('/');
  });
};

/**
 * GET /forgot
 * Forgot Password page.
 */

exports.getForgot = function(req, res) {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }
  res.render('account/forgot', {
    title: 'Forgot Password'
  });
};

/**
 * POST /forgot
 * Create a random token, then the send user an email with a reset link.
 * @param email
 */

exports.postForgot = function(req, res, next) {
  req.assert('email', 'Please enter a valid email address.').isEmail();

  var errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/forgot');
  }

  async.waterfall([
    function(done) {
      crypto.randomBytes(16, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function(token, done) {
      User.findOne({ email: req.body.email.toLowerCase() }, function(err, user) {
        if (!user) {
          req.flash('errors', { msg: 'No account with that email address exists.' });
          return res.redirect('/forgot');
        }

        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        user.save(function(err) {
          done(err, token, user);
        });
      });
    },
    function(token, user, done) {
      var smtpTransport = nodemailer.createTransport('SMTP', {
        service: 'SendGrid',
        auth: {
          user: secrets.sendgrid.user,
          pass: secrets.sendgrid.password
        }
      });
      var mailOptions = {
        to: user.email,
        from: 'hackathon@starter.com',
        subject: 'Reset your password on Hackathon Starter',
        text: 'You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://' + req.headers.host + '/reset/' + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        req.flash('info', { msg: 'An e-mail has been sent to ' + user.email + ' with further instructions.' });
        done(err, 'done');
      });
    }
  ], function(err) {
    if (err) return next(err);
    res.redirect('/forgot');
  });
};
