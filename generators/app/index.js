'use strict';

var yeoman = require('yeoman-generator');

var AppstractGenerator = yeoman.generators.NamedBase.extend({

    app: function() {
        console.log('APP NAME:', this.name);
        this.appname = this.name;
        this.username = require('git-user-name');
        this.useremail = require('git-user-email');

        this.mkdir(this.appname);
        this.destinationRoot(this.appname);

        this.template('_README.md', 'README.md');
        this.template('_LICENSE', 'LICENSE');
        this.template('_package.json', 'package.json');
        this.copy('gitignore', '.gitignore');
        this.copy('gulpfile.js', 'gulpfile.js');
        this.copy('index.js', 'index.js');

        this.directory('public/img', 'public/img');
        this.template('public/_index.html', 'public/index.html');
        this.copy('public/main.js', 'public/main.js');
        this.copy('public/style.css', 'public/style.css');

        this.npmInstall()
    }

});

module.exports = AppstractGenerator;
