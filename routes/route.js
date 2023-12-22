// Importing modules
const express = require('express')
const path = require('path')
const router = express.Router();
const fs = require("fs")

// routing
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + '/../public/main.html'))
})


// Exporting the module
module.exports = router;