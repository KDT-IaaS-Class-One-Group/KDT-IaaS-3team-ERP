// Importing modules 
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

app.use(cors);

// Connect MariaDB
const connection = mysql.createConnection({
  host: 'localhost',
  port: '3338',
  user: 'root',
  password: '1234',
  database: ''
})

connection.connect((err) => {
  if (err) {
    console.error('MariaDB connection failed')
  } else{
    console.log('Connected to MariaDB as id' + connection.threadId);
  }
});

// query execute
connection.query('CREATE DATABASE IF NOT EXISTS userInfo', (err) => {
  if (err) throw err;
  // use database
  connection.query('USE userInfo', (err) => {
    if (err) throw err;
    // table create
    connection.query(`CREATE TABLE IF NOT EXISTS users ( id INT AUTO_INCREMENT PRIMARY KEY, userID VARCHAR(255) NOT NULL, userPW VARCHAR(255) NOT NULL, userNAME VARCHAR(255) NOT NULL);`, (err) => {
      if (err) throw err;
      console.log('CREATE DATABASE && TABLE complete')
    })

  })
})
