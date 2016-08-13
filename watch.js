var Oxypogon = require('../oxypogon');
var config = require('./config');
var argv = require('yargs').argv;

var oxypogon = new Oxypogon(config);
if (argv.path) {
	oxypogon.watch(argv.path);
} else {
	console.log('no path specified');
}
