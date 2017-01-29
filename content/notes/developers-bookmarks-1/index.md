date: 2016-08-18 11:00
more: Proceed to a huge list of notes on web apps, automated testing, CSS, variable declaration types in JavaScript and so on
template: article

# Developer's bookmarks #1: progressive web apps, automated testing pyramid, thoughts about good code and some CSS fun

This time I decided to separate all related to software development stuff from personal and other things that are interesting but are off the topic.

Here is a huge list of articles which I, by means of some unknown magic (even for me!), could read in the course of the past week. The most interesting and fun story which I'd like to start with is [the history of the `blink` tag](http://www.montulli.org/theoriginofthe%3Cblink%3Etag). This is an amazing read of the kind I like most of all: an amusing story on something very related to me and my experience (of course, technologies and guys who invented them). Must read for everyone!

## React's diff algorithm
Christopher Chedeau tells how the diffing algorithm is implemented in React. As in general algorithms finding difference between trees (in form of needed operations to transform one to another) are as complex as `O(n³)`, React implements the simpler one which compare trees level by level and re-rendering the whole sub-tree if the level was modified.

React also implements its own event delegation model and gives the user an opportunity to customize sub-tree rendering by implementing a `shouldComponentUpdate` hook that is provided with the next state objects and should decide whether to re-render component or not.


## Should you ever use a JS framework
Sean reasons about companies of different sizes each having a special place for software in its business and thus makes interesting decisions about should the company use any framework or not.

## Three of more? Use a for!
A rule of thumb about refactoring and code duplication. Once the code is duplicated twice you may decide not to get rid of this duplication by means of refactoring because you can spend time implementing something more useful. But when it comes to three-time duplication these parts of code become way more error-prone and you should refactor the code.

## A beginners guide to progressive web apps

I found a good introduction into the world of progressive web apps which is just arising now. A progressive web app is a website which meets a standard description in the form of `manifest.json` file (it allows an app to specify icons, background, device orientation and other stuff that makes it look and feel more like a native one), uses *Service Workers* and *Cache API* to cache needed “application shell” (a bunch of static assets that are to be downloaded to shape the application) and can be pinned to a home screen just like a native app so you can use it with ease. Those apps can also use *IndexedDB* to store offline data, *PushAPI* to make push notifications and maybe some other cool technologies.

Unfortunately, all these features are available basically on Android devices, in Chrome, Opera etc. So, as the author claims, Safari doesn't support the most part of these features, thus I cannot make my training app on this stack and use it on my iphone yet. Afterward, I found an article which said that iOS had support for PWAs (mainly by means of "add to home screen" menu itema and a special meta-tag in the head of the page) but a 9-year old one. There was no service workers, no PWA manifest support and iOS still lacks support for all this stuff.

## How to write good code

Pretty clear article about the basics of professional programming - i.e. writing code. This is not the competitional programming when you have to understand problem in detail and then write the solution in code most quickly. Professional programming, when your code solves business problems and should fit business restrictions and requirements is different. Author says and I agree that code should be easy to change (as the requirements tend to change vastly and surprisingly fast), it should be easy to read and understand (as you colleagues need to change adjacent parts of the system), it should work (yep!) and, finally, it's better for you and others if the code you write is elegant enough. An important notice is that you probably never will achieve the mastery and start writing ideal code one day. But you can try unless you don't have another deadline in front of you.

## Automated testing best practices
I found a great article by Xolvio which covered a few significant gaps in my understanding of automated testing.

### The testing pyramid
The testing pyramid is finally unveiled by the article itself and the reference to the [article by Mike Cohn, The Forgotten Layer of Test Automation Pyramid](https://www.mountaingoatsoftware.com/blog/the-forgotten-layer-of-the-test-automation-pyramid).

*Unit tests* form the foundation of the pyramid because they can be easily written (in case your code is well decoupled) and give instant feedback on introduced bugs (“line 50 or somewhere around there has just broke up”).

The next *Service layer* introduces all domain-specific testing. This includes all objects and actions in the system that form it's basic functionality. This layer testing procedures better to be detached from UI. For example, there can be an `AdData` class instance that communicates with an `AdManager` instance to accomplish `Show advertisement` process (service in other words) in an advertisement showing program. Typically this level of testing should cover a few cooperating modules. The interesting part is, those tests are often become forgotten, yet they should glue the massive and precise unit tests layer together with the fragmentary level of UI tests.

The last **UI tests level** is not described in detail, but is said to be the most fragile and hard to develop and maintain one, thus it should be the smallest one on the top of the tesing pyramid.

The first two “lessons” of th article form another gap in my understanding that is, unfortunately, is not filled up yet, even with the text. They try to explain the importance of thinking in the _domain_ of your business and writing tests in accordance with it, refer to Domain Driven Design (I've tried to find some useful examples of designing systems by those guides, but haven't succeed yet) and call to first think about tests in the world of not existing program (with its implementation details like CSS class names) where only the meaning itself exists.

The article also mentions Gherkin (Cucumber scenario declaration language). I don't understand yet what this tool is actually designed for, but the idea of separating test specification of the test and the code seems to be interesting. The question is, how hard would be the maintenance of separated code with a specification icing on top of it.

Author also strongly (too strongly, I think!) recommends to try out [Wallaby.js](http://dm.gl/), a test runner tool which executes test over the code right in time of your editing. The license for the tool is sold for $100+ so maybe authors are just connected in some partnership... Eventually, it doesn't matter because the article itself is a good starting point to the understanding of testing automation.

## Full-width child element in a limited with parent
I found an interesting compilation of methods that make possible a child element to have width of the browser window while placed in a fixed-width parent. Basically this is achieved either with negative margins (if you lucky enough to know the parent's width) or with viewport-based width unit `vw` (abbreviation for *viewport width*).

This feature can be used for a blog like mine, for example. Once I decide to publish something interesting with images (not only this booooooring text), I'll definitely try this tecnique.

## Chosing between `var`, `const` and `let` in a ES2015 project
Remy Sharp wrote an article about chosing the right variable/constant declaration method. After reading, I agreed and decided to follow the simple rule in my ES6 projects: make all varaibles block-scoped by default by using `let` for declaration and try to make a `const` anything that is not designed to change (wheter it is a pointer to an object-like structure or just a primitive value).

## Pipes and filters data processing pattern

Imagine you have an appication that processes data from a few different sources. One, for instance, is user input and another one is database input that has come from the server. Initally those two data sources can have more differences than similarities, but eventually, I claim, they both will duplicate each other's functionality more or less, but in amount that is enough, for sure, to become a source of copy-paste errors.

Thinking about a problem of this class in my project I found an interesting and simple pattern named **Pipes and Filters**. The pattern in essence implements a very straigthforward idea of separating processing routines into different modules (namely *filters*) and combining them into chains (namely *pipes*). There can be two pipes (one for each source of input data) with a few filters in our simple example mentioned above.

This pattern is recommended to be used in distributed systems but it's pretty clear that the benefits (separation of concerns between different filters processing the same input, better code reuse posibilities and an opportunity to make modules loosely coupled) encourage us to use it even in a single-threaded environments like browsers that execute JavaScript programs. But I don't know how yet.

## `git bisect` as a way to make binary search by repo for a mistake
I have never used it before, but `git bisect` seems to be a simple yet powerful tool for searching your long commit history for a particular one commit which produced a bug for the first time or introduced new feature. Originally the reference to `git bisect` was found on [@bessarabov's Facebook](https://www.facebook.com/ivanbessarabov).

## Feel free to comment and follow
Hey, if you've read this article till the most end, maybe your're interested in saying what's on your mind? Don't hesitate and write down a comment!

If you like my articles, **[follow me on twitter](https://twitter.com/oleggromov)**.

## Sources
Any blog is made to be read. This one is not an exception. As long as I have so many external links right in the text (which seems to be a good idea for the first time) any of which will never bring you back to my site, I don't understand what a miracle can make you stay with me. So far, all the references are listed below:

* [React's diff algorithm](http://calendar.perfplanet.com/2013/diff/)
* [When to use a JavaScript framework](http://www.planningforaliens.com/blog/2016/06/09/when-to-use-a-js-framework/)
* [Three or more? Use a for!](https://en.wikipedia.org/wiki/Rule_of_three_%28computer_programming%29)
* [Beginners guide to progressive wep apps](https://www.smashingmagazine.com/2016/08/a-beginners-guide-to-progressive-web-apps/)
	* [Don't use iOS web app meta tag](https://medium.com/@firt/dont-use-ios-web-app-meta-tag-irresponsibly-in-your-progressive-web-apps-85d70f4438cb)
* [How to write good code](http://www.daedtech.com/write-good-code/)
* Xolvio's [automated testing best practices](https://github.com/xolvio/automated-testing-best-practices)
	* [Testing Success Factors](https://github.com/xolvio/automated-testing-best-practices/blob/master/content/TESTING-SUCCESS-FACTORS.md)
	* [Gherkin, Cucumber scenario declaration language](https://github.com/cucumber/cucumber/wiki/Gherkin)
* Chris Coyer's [how to make full-width child element.](https://css-tricks.com/full-width-containers-limited-width-parents/)
* Remy Sharp's [chosing the right variable/constant declaration method](https://remysharp.com/2016/08/09/var-const-let)
* Pipes and filters:
	* [Microsoft's “Pipes and Filters” article on MSDN](https://msdn.microsoft.com/en-us/library/dn568100.aspx)
	* [Pipe-and-Filter, by *Dossier Andreas*](http://www.dossier-andreas.net/software_architecture/pipe_and_filter.html)
* [A good explanation of git bisect](http://stackoverflow.com/a/4714297) with an example of git bisect usage can also be found on Stack Overflow.
