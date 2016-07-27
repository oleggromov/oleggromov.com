# oleggromov.com
This is my personal site's source code. It is generated using Oxypogon.js, the [lightweight blog generating tool](https://github.com/oleggromov/oxypogon).

## TODO
* functionality
	* decide how to include images into articles
	* RSS with articles
* appearance
	* find an appropriate style (fonts, spacing etc)
	* [color scheme](https://color.adobe.com/Birdfolio-Blues-color-theme-7588080)
* structure
	* make one layout (html, body, sidebar etc) which is extended by different pages (index, article, about)
	* split articles' content into tokens (heading, paragraph and so on) to insert date between the heading of article and its body
	* take out links from the template into config
	* set up css compilation from blocks in stylus
* deploy and web-server
	* write scripts
	* set up caching and prevent touching of not updated pages
	* make an url diff checker to check if all of the urls originally placed on the site are still present after the deploy
