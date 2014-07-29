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
        this.directory('app/img', 'app/img');

        this.template('_README.md', 'README.md');
        this.template('_LICENSE', 'LICENSE');
        this.template('_package.json', 'package.json');
        this.copy('gulpfile.js', 'gulpfile.js');
        this.copy('app/main.js', 'app/main.js');
        this.copy('app/style.css', 'app/style.css');
        this.template('app/_index.html', 'app/index.html');
    }
});

module.exports = AppstractGenerator;
