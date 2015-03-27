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
      },
      {
        name: 'port',
        message: 'What port number do you want your server to use?',
        default: '8080'
      }
    ];

    this.prompt(prompts, function(answers) {
      this.answers = answers;

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
          name: this.answers.name,
          description: this.answers.description
        }
      );
    },

    app: function() {
      this.fs.copyTpl(
        this.templatePath('app/app.js'),
        this.destinationPath('app/app.js'),
        {
          port: this.answers.port
        }
      );
      this.fs.copy(
        this.templatePath('app/controllers/main.js'),
        this.destinationPath('app/controllers/main.js')
      );
    },

    grunt: function() {
      this.fs.copy(
        this.templatePath('Gruntfile.js'),
        this.destinationPath('Gruntfile.js')
      );
      this.fs.copy(
        this.templatePath('configs/grunt/eslint.js'),
        this.destinationPath('configs/grunt/eslint.js')
      );
    },

    dotFiles: function() {
      this.fs.copy(
        this.templatePath('.editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('.eslintrc'),
        this.destinationPath('.eslintrc')
      );
      this.fs.copy(
        this.templatePath('gitignore'),
        this.destinationPath('.gitignore')
      );
    },

    documentation: function() {
      this.fs.copy(
        this.templatePath('README.md'),
        this.destinationPath('README.md')
      );
    }
  },

  install: function() {
    this.npmInstall(
      [
        'body-parser',
        'cookie-parser',
        'express'
      ],
      {save: true}
    );
    this.npmInstall(
      [
        'grunt',
        'load-grunt-tasks',
        'grunt-eslint',
        'grunt-cli'
      ],
      {saveDev: true}
    );
  }
});
