'use strict';

var config = require('./config');
var getSources = require('./lib/getSources');
var transformMarkdown = require('./lib/transformMarkdown');
var splitSources = require('./lib/splitSources');
var extractTitle = require('./lib/extractTitle');
var render = require('./lib/render')(config.tplPath);

getSources(config.build.sources)
    .then(processSources)
    .catch(logError);

function processSources (sources) {
    renderMarkdown(sources);
    var parts = splitSources(sources);

    parts.pages.forEach(function (page) {
        page.rendered.meta.title = extractTitle(page.rendered.html);

        page.rendered.fullPage = render({
            tpl: page.rendered.meta.template,
            content: page.html,
            meta: page.rendered.meta,
            common: config.common,
            pieces: parts.pieces
        });
    });

}

function renderMarkdown (sources) {
    for (var key in sources) {
        sources[key].rendered = transformMarkdown(sources[key].contents);
    }
}

function logError (err) {
    console.warn(err);
}



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
