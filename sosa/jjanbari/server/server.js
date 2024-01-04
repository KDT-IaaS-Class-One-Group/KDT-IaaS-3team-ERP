// Importing modules 
const express = require('express');
const path = require('path');
const route = require('./routes/route');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 9997;

app.use(cors);

// Connect MariaDB
const connection = mysql.createConnection({
  host: 'localhost',
  port: '3333',
  user: 'root',
  password: '1234',
  database: 'janjanbari'
})

connection.connect((err) => {
  if (err) {
    console.error('MariaDB connection failed')
  } else{
    console.log('Connected to MariaDB as id' + connection.threadId);
  }
});

// query execute
connection.query('CREATE DATABASE IF NOT EXISTS users', (err) => {
  if (err) throw err;
  // use database
  connection.query('USE users', (err) => {
    if (err) throw err;
    // table create
    connection.query('CREATE TABLE IF NOT EXISTS userinfo (name CHAR(255), id CHAR(255), password INT(255))', (err) => {
      if (err) throw err;
      console.log('CREATE DATABASE && TABLE complete')
    })

  })
})

// Middleware for serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Registering a router for the '/' path
app.use('/', route);

// Starting the server
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
})