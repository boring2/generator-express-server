'use strict';

var app = require('../app');

function main(req, res) {
  res.send('Server is up');
}

// Routes
app.get('/', main);
