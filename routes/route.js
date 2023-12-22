// Importing modules
const express = require('express')
const path = require('path')
const router = express.Router();
const fs = require("fs")

// routing
// main page
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + '/../public/main.html'))
})

router.post("/", (req, res) => {
  res.sendFile(path.join(__dirname + '/../public/main.html'))
})

// login page
router.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname + '/../public/login.html'))
})

// Exporting the module
module.exports = router;