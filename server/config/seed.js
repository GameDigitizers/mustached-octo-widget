/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');
var Game = require('../api/game/game.model');
var Building = require('../api/building/building.model');
var Wonder = require('../api/wonder/wonder.model');

Thing.find({}).remove(function() {
    Thing.create({
        name: 'Development Tools',
        info: 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.'
    }, {
        name: 'Server and Client integration',
        info: 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.'
    }, {
        name: 'Smart Build System',
        info: 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html'
    }, {
        name: 'Modular Structure',
        info: 'Best practice client and server structures allow for more code reusability and maximum scalability'
    }, {
        name: 'Optimized Build',
        info: 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.'
    }, {
        name: 'Deployment Ready',
        info: 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
    });
});

User.find({}).remove(function() {
    User.create({
        provider: 'local',
        name: 'Test User',
        email: 'test@test.com',
        password: 'test'
    }, {
        provider: 'local',
        role: 'admin',
        name: 'Admin',
        email: 'admin@admin.com',
        password: 'admin'
    }, function() {
        console.log('finished populating users');
    });
});

Game.find({}).remove(function() {
    Game.create({
        name: 'septo-gorilla',
        info: '',
        active: true
    }, {
        name: 'septo-temple',
        info: '',
        active: false
    }, function() {
        console.log('finished populating games');
    });
});

Building.find({}).remove(function() {
    Building.create({
        name: 'septo-Walls'
    }, function () {
        console.log("finished populating buildings");
    });
});

Wonder.find({}).remove(function() {
    Wonder.create({
        name: 'Giza'
    }, {
        name: 'Rhodos'
    }, {
        name: 'Ephesus'
    }, {
        name: 'Babylon'
    }, {
        name: 'Alexandria'
    }, {
        name: 'Olympia'
    }, {
        name: 'Halicarnassus'
    }, function () {
        console.log("finished populating wonders")
    });
});