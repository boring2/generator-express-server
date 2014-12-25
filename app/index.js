'use strict';
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  greet: function () {
    this.log(yosay('Hello!\nIt\'s time to create an awesome express server!'));
  },

  prompting: function () {
    var done = this.async();

    var prompts = [
      {
        name: 'name',
        message: 'How do you want to name this server?',
        default: 'express-server'
      },
      {
        name: 'description',
        message: 'Describe your server in a few words',
        default: 'Just a test'
      }
    ];

    this.prompt(prompts, function(answers) {
      this.name = answers.name;
      this.description = answers.description;

      done();
    }.bind(this));
  },

  writing: {
    // package.json is a template so lets do the correct replacements based on
    // user input
    packageJson: function () {
      this.fs.copyTpl(
        this.templatePath('package.json'),
        this.destinationPath('package.json'),
        {
          name: this.name,
          description: this.description
        }
      );
    },

    dotFiles: function () {
      this.fs.copy(
        this.templatePath('.editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('.eslintrc'),
        this.destinationPath('.eslintrc')
      );
      this.fs.copy(
        this.templatePath('.gitignore'),
        this.destinationPath('.gitignore')
      );
    }
  }
});
