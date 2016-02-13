# oleggromov.com
This is my personal site's source code. It's generated statically via self-written in the early 2015 bunch of gulp plugins and helpers.
Once I understand how this static site generator can better meet my needs of blogging I'll necessarily pack it into a well-documented and appropriate for usage form. Until this happens please consider this code to be just an experiment which goal is to make [my home-made site](http://oleggromov.com).

## TODO
* functionality
	* ~~append disqus widgets to the article pages~~
	* make code highlighting possible (maybe using highlight.js)
	* decide how to include images into articles
	* insert yandex metrika into site
* appearance
	* ~~make mobile-friendly versions (smartphone and tablet)~~
	* find an appropriate style (fonts, spacing etc)
	* [color scheme](https://color.adobe.com/Birdfolio-Blues-color-theme-7588080)
* structure
	* decompose gulpfile to separate files by site sections
	* make one layout (html, body, sidebar etc) which is extended by different pages (index, article, about)
	* split articles' content into tokens (heading, paragraph and so on) to insert date between the heading of article and its body
	* take out links from the template into config
	* set up css compilation from blocks in stylus
	* transform the whole site into repositories: content (markdown in fixed format), static engine and it's config
* menu:
	* decide how to automatically mark active menu points
* deploy
	* write scripts