date: 2016-08-07 19:00
more:
template: article

# Making of Oxypogon.js, the static blog generator

Originally the idea of blogging and, afterwards, the idea of creating simple blogging system called _Colibri_ emerged in my mind back in 2009 year as far as I remember. Probably there was nothing interesting in my experience that days to be shared with anyone, but the idea itself seemed to be interesting (make some system from scratch) and useful (get a blogging engine as a result).

![Oxypogon](oxypogon-the-bird.jpg)

I started with just a blueprint in a form of written high-level description of the system and ended at the same point without any further development. Actually I didn't have enough motivation to write a blog and especially building a blog engine that time.

During those years I returned to the idea a few times: created some versions of this site (sometimes I will definitely find them and publish in the archive) and wrote some articles, maintained a [livejournal-based blog by the name of rawgift](http://rawgift.livejournal.com/) in Russian. But all of those attempts failed for some reason.

Years later, in the early 2015<sup>th</sup>, I created the first version of this blog using a [bunch of gulp-based scripts](https://github.com/oleggromov/oleggromov.com/tree/613fb2c6cb626f8bed88c5831bbf341f87317e65). Gulp was very familiar to me and in fact the only well-known Node.js utility. The biggest gulp task looked like this:

```
gulp.task('index', function() {
	var previews = require('./helpers/previews').getList;
	var articles = [];

	var menu = _.cloneDeep(menuGlobal);
	menu[0].active = true;

	var options = _.cloneDeep(jadeOptions);

	gulp.src('src/content/articles/**/*.md')
		.pipe(previews(articles))
		.pipe(data(sortAndBuild));

	function sortAndBuild() {
		var sortedArticles = _.sortBy(articles, function(article) {
			return -(new Date(article.date));
		});

		gulp.src('src/page/articles/index.jade')
			.pipe(jade(_.assign(options, {
				locals: {
					articles: sortedArticles,
					menu: menu
				}
			})))
			.pipe(gulp.dest(to + 'articles/'));
	}
});
```

And the remaining code was more or less like a mess of configuration, ambiguous gulp plugins' calls mixed with file paths and weird processings of the intermediate data being in an unpredictable form and state — connected all together by gulp piping. I decided to take some parts away by moving the processing functions into `helpers/` directory like modules-functions to add some accuracy and tidiness. This helped a little. I just got files like `helpers/previews/index.js`:

```
var through = require('through2');
var meta = require('../meta');
var _ = require('lodash');
var path = require('path');
var markdown = require('../markdown');

module.exports.getList = function(previews) {
	return through.obj(function(file, enc, callback) {
		if (file.isNull()) {
			callback(null, file);
			return;
		}

		if (file.isStream()) {
			callback(new gutil.PluginError('pipe-article', 'Streaming not supported'));
			return;
		}

		var source = file.contents.toString();
		var articleMeta = meta.extract(source);

		var preview = _.pick(articleMeta, [
			'date',
			'more'
		]);

		var filePath = path.dirname(file.path);
		preview.url = filePath.replace(file.cwd + '/src/content', '') + '/';
		preview.preview = markdown.getPreview(source);
		preview.title = markdown.getTitle(source);

		previews.push(preview);

		callback(null, file);
	});
};
```

Which in turn was messy, required other helpers and, even worse, obscure modules and checks in code required for any gulp plugin to work. This was a hell in essence but it helped me to build first quite modern version of my blog, publish it and forget about the idea and its terrible realization for year.

As was mentioned above, initially I found “Colibri” fitting my idea of simple and lightweight engine very well as it's known its tiny little size and startling wing swinging speed. Eventually this name proved to be taken at least on the npm registry and I decided to change it.

Next I found a list of different humminbirds on the Wikipedia (I won't share it with you because there're too many perfect names for my further projects), chosen the most severe and a bit grumpy one (I think it a bit like me) and named the project in honor of it. **Oxypogon!** I guess it should be pronounced as “aksi-pa-gen” or something similar, but I'm not sure. Furthermore Oxypogon is a very beautiful bird (you can see its picture at the top) and I humbly hope my code to be of the same quaility ultimately.

## Stop! Why not existing solutions?

Hexo, docpad...

## The first incarnation — gulp

## Transition to procedural-modular version

## Eventually well defined system built on classes

## Future plans and current flaws