// Importing modules 
const express = require('express');
const path = require('path');
const route = require('./routes/route');
const mysql = require('mysql2');

const app = express();
const port = 3000;

// Connect MariaDB
const connection = mysql.createConnection({
  host: 3333,
  user: "root",
  password: "Andpf445169!",
  database: "janjanbari",
})

// Middleware for serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Registering a router for the '/' path
app.use('/', route);

// Starting the server
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
})