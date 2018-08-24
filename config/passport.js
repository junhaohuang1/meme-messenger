//we import passport packages required for authentication
var passport = require("passport");
var bcrypt = require("bcrypt-nodejs");
var LocalStrategy = require("passport-local").Strategy;
const jwt = require('jsonwebtoken');
const jwtSecret = "a secret phrase!!"
//
//We will need the models folder to check passport agains
var db = require("../models");
console.log('rtest1');

passport.use('local-signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
},(req, email, password, done) =>{
    db.User.findOne({where: {email:email}}).then(function(user){
      if(user)
      {
        console.log('found existing user');
        const error = new Error('That email is already taken');
        error.name = 'DuplicateEmail';
        return done(error);
      } else {
        db.User.create({
          name: req.body.name.trim(),
          email: req.body.email.trim(),
          password: req.body.password.trim()
        }).then(function(newUser, created){
            if(!newUser){
              return done(null,false);
            }
            if(newUser){
              return done(null,newUser);
            }
          })
        }
      })
  })
)




// Telling passport we want to use a Local Strategy. In other words,
//we want login with a username/email and password
passport.use('local-signin', new LocalStrategy({
  // Our user will sign in using an email, rather than a "username"
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
},function(req, email, password, done) {
    // When a user tries to sign in this code runs
    db.User.findOne({
      where: {
        email: email
      }
    }).then(function(dbUser) {
      // If there's no user with the given email
      if (!dbUser) {
        const error = new Error('Incorrect email or password');
        error.name = 'IncorrectCredentialsError';
        return done(error);
      }
      // If there is a user with the given email, but the password the user gives us is incorrect
      else if (!dbUser.validPassword(password)) {
        const error = new Error('Incorrect email or password');
        error.name = 'IncorrectCredentialsError';
        return done(error);
      }
      // If none of the above, return the user
      const payload = {
        sub: dbUser.id
      };

      // create a token string
      const token = jwt.sign(payload, jwtSecret);
      const data = {
        name: dbUser.name,
        id: dbUser.id
      };
      return done(null, token, data);
    });
  }
));
//
// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser(function(user, cb) {
  cb(null, user);
});
//
passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});
//
// Exporting our configured passport
module.exports = passport;
