var db = require("../models");
var passport = require("passport");
const PassportLocalStrategy = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');


module.exports = function(passport, user) {
    var User = user;
    var LocalStrategy = require('passport-local').Strategy;
}


module.exports = new PassportLocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, name email, password, done) => {
  db.User.create({
    name: req.body.name.trim(),
    email: req.body.email.trim(),
    password: req.body.password.trim()
  }).then(function() {




})
//
// db.User.create({
//   name: req.body.name,
//   email: req.body.email,
//   password: req.body.password
// }).then(function() {
//   res.redirect(307, "/login");
// }).catch(function(err) {
//   console.log(err);
//   res.json(err);
//   console.log("the error is " + err);
//   return res.status(400).json({
//     success: false,
//     message: err.message
//     })
//   });
