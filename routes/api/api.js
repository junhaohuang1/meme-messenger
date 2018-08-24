const express = require('express');
var db = require("../../models");
const url = require('url');

const router = new express.Router();

router.get('/dashboard', (req, res) => {
    console.log("dashboard")
  res.status(200).json({
    message:"we are at our dashboard"
  });
});



router.get('/findfriend', (req, res) => {
  console.log("at findfriend api")
  db.User.findOne({
    where:{
      email:req.body.email
    }
  }).then(function(dbUser){
      if (!dbUser) {
        console.log('couldnt find user');
        return res.status(401).redirect(url.format({
          pathname:'/api/friendsearchresult',
          query:{
            "success": false,
            "errorMessage": 'user not found'
            }
          }));
        // return res.status(401).json({
        //   success:false,
        //   errors:{
        //     message:"user not found"
        //   }
        // });
      }
      console.log('found user');
      return res.status(200).redirect(url.format({
        pathname:'/api/friendsearchresult',
        query:{
          "success": true,
          "userId": dbUser.id,
          "username": dbUser.name,
          "email": dbUser.email
          }
        }));
        // return res.json({
        //   success: true,
        //   result:{
        //     userId: dbUser.id,
        //     username: dbUser.name,
        //     email: dbUser.email
        //     }
        // })
    })
});

router.get('/friendsearchresult', (req, res) => {
  if(!req.query.success){
    console.log('hi');

  }
});


module.exports = router;
