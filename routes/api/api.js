const express = require('express');

const router = new express.Router();

router.get('/dashboard', (req, res) => {
    console.log("dashboard")
  res.status(200).json({
    message:"we are at our dashboard"
  });
});

module.exports = router;
