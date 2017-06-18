date: 2017-06-18
written: 2017-06-18
more: Find out what I realized about perceving the outside world
template: article
# tags: counter app, tl;dr

# What I've Learnt Making a Simple Full-stack App from Zero to a Deploy

Almost 2 months ago, on April 22, I decided to make something happen finally. It had been a really long story in my life, of constant programming and ideas that had never become real, and I was thinking "jeez, how long can I keep (not) doing that!".

I had a bunch of different ideas of small apps to make that could even be supposedly useful, at least for me. One of them was an application to track expenses during short vacations. Create a list, add every single spent cent, count everything in the end. As simple as that. Of course, the full idea has some whistles on top, like report generation, categorization with suggestions based on the history of spendings saved in this list.

General:
- unnecessary features and unfamiliar technologies will drain your time and put at risk your project

Front-End:
- a good component library is hard to implement
- declarativity comes at a price; and it's good if it's not you who pays it
- switching to the React's "lifting state up" paradigm incorporates a significant mindset change
- redux will help with managing state in complex applications; simple ones content with in-component state

Back-End:
- RESTful APIs should be stateless, which I violated by requiring cookie-signed requests
- Promises work really well when *not mixed* with callbacks, otherwise it becomes a nightmare
-

Packaging / Deploying:
- Docker is a powerful and very liberating tool
- separating application concerns by splitting it into microservices is good
- Amazon Web Services is an extremely complex product
- mysql dockerization is questionable

Time estimates

- it's very hard to predict!


**[screenshot/video]**

I called it simply **"Counter"**.

Historically, I'm a front-end developer. I started my career as HTML/CSS coder and proceeded to becoming a JS programmer. Thus, I started my application from the most familiar for me part, the front-end. I pictured it as a [React](https://facebook.github.io/react/) single-page application that is connected to the back end via RESTful API. The funny thing is, Counter is my first SPA written from scratch. Aside from React, I picked [standard.js](https://standardjs.com/) as a eslint preset, [webpack2](https://webpack.js.org/) and [Babel](https://babeljs.io/) for code assembly and transpiling, [PostCSS](https://github.com/postcss/postcss) and [CSS Modules](https://github.com/css-modules/css-modules) to make stylesheets clean and isolated. This is a pretty common set of tools for a modern front-end app, even maybe an incomplete one (without redux at least).

## Unnecessary Fetaures and Unfamiliar Technologies Drain Your Time

What was worse, I had no idea how to make an entire application and also was obsessed with some useless features like having a desktop and a mobile version and a particular implementation of it. Even one of the first modules I had written was a media query detection module.

I tried but absolutely didn't like component-based approaches for the media detection - for me, it looked unnatural and unclear. On the other hand, my initial idea about working with different devices, which I picked a few years ago in a good but already outdated [article about component approach](http://wilsonpage.co.uk/the-component-approach/), was to create a module that detects media changes and then somehow provide all the components with the information about the detected type. It could be either Modernizr-like idea to set a class on a root component (in essence, a global variable but stored in a DOM-bounded `class` attribute), or closer to a normal React approach provider component that sends properties down the tree via `context`. The latter is basically what was already implemented in [react-media](https://github.com/ReactTraining/react-media) module, for instance.

After messing around with these ideas for a while, I realized that I actually don't need any "desktop" version. The main use case for the application is fully covered by a mobile version, and if I want to add something from my computer I can always use it from a desktop. Hello! Another lesson learned. I ended up with a tiny [detect-media.js module](https://github.com/oleggromov/counter/blob/master/client/modules/detect-media.js) that accepts [a simple config](https://github.com/oleggromov/counter/blob/master/client/components/App.jsx#L15-L18) and returns the detected media. There's no need to run these checks over the application lifetime because the media never changes, except the device rotation of course, but there's nothing I wanted to do about it. But once I even a had a [media change detection class](https://github.com/oleggromov/counter/commit/f4fd35f7b8e96097577009f06f8262bbe828052f)!

> That said, I definitely spent way too much time hustling around with unfamiliar libraries and tools, which sensibly shouldn't be the case for any project being on a tight timing. What was even more time consuming, is the feature creep and lack of understanding what was and was not needed. Reduced by these two factors, the time I spent to create this application could be drastically reduced.

Other things I spent too much time on:
- temporary LocalStorage-based store for data
-

## A Good Component Library is Hard to Implement



## Declarativity Comes at a Price

Good `Form` component example.

Bad actions config form back-end example.



Here is [the client-side code](https://github.com/oleggromov/counter/tree/master/client) I ended up with.

