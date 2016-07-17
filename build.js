'use strict';

var fs = require('fs');
var path = require('path');

var extractTitle = require('./lib/extractTitle');
var config = require('./config');


var getSources = require('./lib/getSources');
getSources(config.build.sources)
    .then(function (sources) {
        console.log(sources);
    });


// config.build.sources.pieces.forEach(function (pattern) {
//     var glob = require('glob');
//     pattern = path.resolve(config.build.sources.base, pattern);

//     glob.sync(pattern).forEach(savePiece);
// });

// function savePiece (name) {
//     var fs = require('fs');
//     var md = require('markdown-it')();
//     var content = fs.readFileSync(name, 'utf8');
//     var file = path.parse(name);

//     config.common.pieces = config.common.pieces || {};
//     config.common.pieces[file.name] = md.render(content);
// }

// config.build.sources.list.forEach(function (pattern) {
//     pattern = path.resolve(config.build.sources.base, pattern);

//     glob(pattern, {}, eachGlob);
// });


// function eachGlob (err, files) {
//     if (err) {
//         throw err;
//     }

//     files.forEach(readFile);
// }

// function readFile (filename) {
//     var file = path.parse(filename);

//     fs.readFile(filename, 'utf8', processFile.bind(undefined, file));
// }

// function processFile (file, err, data) {
//     var md = require('markdown-it')();
//     var metamd = require('metamd');

//     if (err) {
//         throw err;
//     }

//     var parsed = metamd(data);
//     var data = parsed.data;
//     var html = md.render(parsed.markdown);

//     data.title = extractTitle(html);
//     data.content = html;

//     renderFile(file, config.common, data);
// }

// function renderFile (file, common, data, html) {
//     var jade = require('jade');
//     var moment = require('moment');

//     var tplPath = path.resolve(config.tplPath, data.template + '.jade');

//     var options = Object.assign({
//         pretty: true,
//         basedir: path.resolve(config.tplPath)
//     }, {
//         common: common,
//         data: data,
//         moment: moment
//     });

//     var compiled = jade.renderFile(tplPath, options);

//     createDir(file, compiled);
// }

// function createDir (file, html) {
//     var mkdirp = require('mkdirp');

//     var pagePath = path.relative(config.build.sources.base, file.dir);
//     var buildPath = path.resolve(config.build.dest, pagePath);

//     mkdirp(buildPath, writeFile.bind(undefined, buildPath, file, html));
// }

// function writeFile (buildPath, file, html, err) {
//     if (err) {
//         throw err;
//     }

//     var filename = path.resolve(buildPath, file.name + '.html');

//     fs.writeFile(filename, html, reportSucces.bind(undefined, filename));
// }

// function reportSucces (filename, err) {
//     if (err) {
//         throw err;
//     }

//     console.log('written ' + path.relative(process.cwd(), filename));
// }
