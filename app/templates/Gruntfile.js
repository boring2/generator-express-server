'use strict';

module.exports = function(grunt) {
  /**
   * This function grabs all files under the given path and uses them as
   * configurations for grunt tasks
   * @param {string} path - Path were configuration files live
   * @returns {object} object - Object with loaded grunt configs
   */
  function loadConfig(path) {
    var object = {};
    var key;

    var files = grunt.file.expand({cwd: path}, '*');
    files.forEach(function(option) {
      key = option.replace(/\.js$/, '');
      object[key] = require(path + option);
    });

    return object;
  }

  var config = loadConfig('./configs/grunt/');

  grunt.initConfig(config);

  // =================
  // Register Custom Tasks
  // =================
  grunt.registerTask('health', [
    'eslint'
  ]);

  grunt.registerTask('default', ['health']);

  // =================
  // Load npm tasks
  // =================
  require('load-grunt-tasks')(grunt);
};
