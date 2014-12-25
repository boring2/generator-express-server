'use strict';

var express = require('express');
var fs = require('fs');
var path = require('path');

var  app = express();

/**
 * Loads all routes from controllers folder
 */
function initRoutes() {
  var controllersFolder = path.join(__dirname, 'controllers/');
  fs.readdir(controllersFolder, function(error, files) {
    if (error) {
      console.log('Error loading routes', error.stack);
    }

    files.forEach(function(file) {
      var name = file.replace('.js', '');
      require(controllersFolder + name);
    });
  });
}

initRoutes();

app.listen(<%= port %>);
console.log('Server running at: http://localhost:<%= port %>');

// Make the app available to the outside
module.exports = app;
