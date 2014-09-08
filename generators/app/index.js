'use strict';

var yeoman = require('yeoman-generator');
var chalk = require('chalk');


var AppstractGenerator = yeoman.generators.Base.extend({

    promptTask: function() {
        var done = this.async();
        this.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'project name'
            },
            {
                type: 'confirm',
                name: 'run_git',
                message: 'run git init? (default: yes)',
                default: true
            },
            {
                type: 'confirm',
                name: 'run_npm_install',
                message: 'run npm install? (default: yes)',
                default: true
            },

        ], function(answers) {
            this.name = answers.name;
            this.run_git = answers.run_git;
            this.run_npm_install = answers.run_npm_install
            done();
        }.bind(this));
    },

    app: function() {
        console.log("\ngenerating app files...");
        console.log('APP NAME:', chalk.bold.green(this.name));

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

    },

    gitinit: function() {
        var done = this.async();

        if (!this.run_git)
            return done();

        console.log("\nrunning " + chalk.yellow("git init"));
        this.spawnCommand('git', ['init'])
            .on('exit', function(code) {
                console.log(chalk.green('OK') + '\n');
                done();
            });
    },


    end: function() {
        var done = this.async();

        if (!this.run_npm_install)
            return done();

        console.log("running " + chalk.yellow("npm install"));
        this.npmInstall(null, null, function() {
            console.log(chalk.green("\nALL DONE!"));
            console.log(chalk.white("you can now run"));
            console.log(chalk.yellow("cd " + this.appname));
            console.log(chalk.yellow("gulp"));
            done();
        }.bind(this));
    }

});

module.exports = AppstractGenerator;