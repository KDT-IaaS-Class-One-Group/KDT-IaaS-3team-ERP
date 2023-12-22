// Importing modules 
const express = require('express');
const path = require('path')
const route = require('./routes/route')

const app = express();
const port = 3000;

// Middleware for serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Registering a router for the '/' path
app.use('/', route);

// Starting the server
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
})