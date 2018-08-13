//we import passport packages required for authentication
var passport = require("passport");
var bcrypt = require("bcrypt-nodejs");
var LocalStrategy = require("passport-local").Strategy;
const jwt = require('jsonwebtoken');
const jwtSecret = "a secret phrase!!"
//
//We will need the models folder to check passport agains
var db = require("../models");

passport.use('local-signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
},(req, email, password, done) =>{
    db.User.findOne({where: {email:email}}).then(function(user){
      if(user)
      {
        return done(null, false, {message : 'That email is already taken'} );
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
        name: dbUser.name
      };
      return done(null, token, data, dbUser);
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

// module.exports = function(passport,user){
//
// var User = user;
// var LocalStrategy = require('passport-local').Strategy;
//
//
// passport.serializeUser(function(user, done) {
//         done(null, user.id);
//     });
//
//
// // used to deserialize the user
// passport.deserializeUser(function(id, done) {
//     db.User.findById(id).then(function(user) {
//       if(user){
//         done(null, user.get());
//       }
//       else{
//         done(user.errors,null);
//       }
//     });
//
// });
//
//
// passport.use('local-signup', new LocalStrategy(
//
//   {
//     usernameField: 'email',
//     passwordField: 'password',
//     session: false,
//     passReqToCallback: true
//   },
//
//   function(req, email, password, done){
//
//
    // var generateHash = function(password) {
    // return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
    // };
    //
    //  User.findOne({where: {email:email}}).then(function(user){
    //
    // if(user)
    // {
    //   return done(null, false, {message : 'That email is already taken'} );
    // }
    //
    // else
//     {
//       var userPassword = generateHash(password);
//       var data =
//       {
//         name: req.body.name.trim(),
//         email: req.body.email.trim(),
//         password: req.body.password.trim()
//       };
//
//
      // db.User.create(data).then(function(newUser,created){
      //   if(!newUser){
      //     return done(null,false);
      //   }
      //
      //   if(newUser){
      //     return done(null,newUser);
      //   }
      // });
//     }
//
//
//   });
//
//
//
// }
//
//
//
// ));
//
// //LOCAL SIGNIN
// passport.use('local-signin', new LocalStrategy(
//
// {
//
// // by default, local strategy uses username and password, we will override with email
// usernameField : 'email',
// passwordField : 'password',
// passReqToCallback : true // allows us to pass back the entire request to the callback
// },
//
// function(req, email, password, done) {
//
//   var User = user;
//
//   var isValidPassword = function(userpass,password){
//     return bCrypt.compareSync(password, userpass);
//   }
//
//   User.findOne({ where : { email: email}}).then(function (user) {
//
//     if (!user) {
//       return done(null, false, { message: 'Email does not exist' });
//     }
//
//     if (!isValidPassword(user.password,password)) {
//
//       return done(null, false, { message: 'Incorrect password.' });
//
//     }
//
//     var userinfo = user.get();
//
//     return done(null,userinfo);
//
//   }).catch(function(err){
//
//     console.log("Error:",err);
//
//     return done(null, false, { message: 'Something went wrong with your Signin' });
//
//
//   });
//
// }
// ));
//
// }
