'use strict';

var config = require('./config');
var getSources = require('./lib/getSources');
var transformMarkdown = require('./lib/transformMarkdown');
var splitSources = require('./lib/splitSources');
var extractTitle = require('./lib/extractTitle');
var renderPage = require('./lib/renderPage')(config.tplPath);
var writePage = require('./lib/writePage')({
    source: config.build.source,
    dest: config.build.dest
});

// var glob = require('glob');
// var path = require('path');

// glob(path.resolve(config.build.sources.base, config.build.sources.lists[0]), {}, function (err, files) {
//     if (err) {
//         console.warn(err);
//     }

//     console.log(files);
// });

getSources(config.build.source, config.build.sources)
    .then(processSources)
    .catch(logError);

function processSources (sources) {
    console.log(sources);

    renderMarkdown(sources);
    var parts = splitSources(sources);

    parts.pages.forEach(function (page) {
        page.rendered.meta.title = extractTitle(page.rendered.html);

        page.rendered.fullPage = renderPage({
            tpl: page.rendered.meta.template,
            content: page.rendered.html,
            meta: page.rendered.meta,
            common: config.common,
            pieces: parts.pieces
        });

        writePage(page).then(reportSucces).catch(logError);
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

function reportSucces (filename) {
    console.log('written ' + filename);
}
