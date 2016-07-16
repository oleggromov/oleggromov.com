'use strict';

var fs = require('fs');
var path = require('path');


var config = require('./config');

config.build.sources.list.forEach(function (pattern) {
    var glob = require('glob');
    pattern = path.resolve(config.build.sources.base, pattern);

    glob(pattern, {}, eachGlob);
});

function eachGlob (err, files) {
    if (err) {
        throw err;
    }

    files.forEach(readFile);
}

function readFile (filename) {
    var file = path.parse(filename);

    fs.readFile(filename, 'utf8', processFile.bind(undefined, file));
}

function processFile (file, err, data) {
    var md = require('markdown-it')();
    var metamd = require('metamd');

    if (err) {
        throw err;
    }

    var parsed = metamd(data);
    var data = parsed.data;
    var html = md.render(parsed.markdown);

    renderFile(file, config.common, data, html);
}

function renderFile (file, common, data, html) {
    var jade = require('jade');

    var tplPath = path.resolve(config.tplPath, data.template + '.jade');

    var fn = jade.compileFile(tplPath, {
        pretty: true,
        basedir: path.resolve(config.tplPath)
    });

    var html = fn({
        common: common,
        data: data
    });

    createDir(file, html);
}

function createDir (file, html) {
    var mkdirp = require('mkdirp');

    var pagePath = path.relative(config.build.sources.base, file.dir);
    var buildPath = path.resolve(config.build.dest, pagePath);

    mkdirp(buildPath, writeFile.bind(undefined, buildPath, file, html));
}

function writeFile (buildPath, file, html, err) {
    if (err) {
        throw err;
    }

    var filename = path.resolve(buildPath, file.name + '.html');

    fs.writeFile(filename, html, reportSucces.bind(undefined, filename));
}

function reportSucces (filename, err) {
    if (err) {
        throw err;
    }

    console.log('written ' + path.relative(process.cwd(), filename));
}
