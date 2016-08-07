date: 2016-08-07 11:30
more: Read more about e-mail history, birds and something else
template: article

# Bookmarks #2

This week's bookmarks list can be way more interesting for programmers than the previous one because there's one very interesting historical narration and some links about front-end development. There're also some links for those who like science and is interested in world's experience of avoiding traffic jams.

## The History of Electronic Mail, by *Tom Van Vleck*

This is a GREAT article describing the arising of the first mailing system on the CTSS (Compatible Time Sharing System) at MIT in the mid 1960. The system was originally based on the CTSS's New File System capabilities and in fact was a bunch of programs allowed you to send a file contents (message) to a user on a project if you knew their names. System was wrote by *Tom Van Vleck* and his colleague *Noel Morris*.

Tom narrates about the first spam emergence: one of his colleagues who had access for broadcasting in messages wrote a mail starting with a phrase “There is no way to peace. Peace is the way” and tried to defend it arguing with Tom and saying “but this is important!”.

The idea emerged many times, Tom claims, and the message interchanging within a system was implemented almost in any OS of those days. Eventually, after the replacement of CTSS with Multics, Tom ported the original mail program to the latter OS - himself as earlier, because there was no one instead of him who could do it in the right way.

In 1971 *Ray Tomlinson* of BBN modified `sndmsg` program to send messages from one ARPANet host to another and, besides it, proposed to use `@` sign “to separate user name from host name in mail addresses”.

All of those and many other people, discussions and systems were involved in a long process of creating the thing we are all familiar with nowadays, internet mailing system. Tom appeals to use just “mail” instead of term “e-mail” because one day the use of electrons to deliver mail can become quaint in favor of quarks or photons.

[Read the full story](http://multicians.org/thvv/mail-history.html).

### Further reading on the topic:

* [A History of E-mail: Collaboration, innovation and the birth of a system](https://www.washingtonpost.com/national/on-innovations/a-history-of-e-mail-collaboration-innovation-and-the-birth-of-a-system/2012/03/19/gIQAOeFEPS_story.html)
* [Reflections on the 25th anniversary of spam](http://www.templetons.com/brad/spam/spam25.html)
* [Did my brother invent e-mail with Tom Van Vleck?](http://opinionator.blogs.nytimes.com/2011/06/19/did-my-brother-invent-e-mail-with-tom-van-vleck-part-one/?_r=1) (First part?)

### More articles on the topic by Tom Van Vleck:

* [The Risks of Electronic Communication](http://multicians.org/thvv/emailbad.html)
* [How I Filter Spam](http://multicians.org/thvv/spamfilt.html)


## Front-end reads

* [Why we moved from Angular to React](http://blog.belong.co/why-we-moved-from-angular-to-react). An ordinary comparison of two popular frameworks and, what is way more interesting, two patterns that are implemented in Angular in React respectively. The first one, very familiar to me, is MVC with two-way data binding, and the second one, Flux, has only one data direction from the Dispatcher to the Store and finally to the View. This is an interesting overview of the topic for those who are back from the modern framework hype (as I personally).

* [About event loop and execution of tasks of different kinds and sizes in the predefined order](https://blog.risingstack.com/writing-a-javascript-framework-execution-timing-beyond-settimeout/). It's interesting to read about different task queues in browsers, including microtask query, and the methods of interaction with them. Author is making a framework from scratch and promises to write more articles on the same topic. It's a good read if you're interested in browser internals.


## Non-programming stuff

* [Guys from China made a prototype of the bus that goes above the main traffic and can therefore pass by traffic jams](http://gizmodo.com/china-actually-built-that-crazy-traffic-straddling-bus-1784724612). I'm pretty sure that the right way of removing traffic jams is to make owning a car in a megapolis rather expensive and the public transportation enough effective, so people will decide to choose the latter. This bus is a great idea for increasing effectiveness of public transport, but I'm very curious about the method of turning the corners.

* [London physicists coupled electron and photon](http://phys.org/news/2016-08-scientists-previously-unknown.html). An interesting writing that describes the coupled photon and electron. Besides the curiosity to characteristics of matter and some practical applications (electron and photon being bounded together share some of each other's properties making possible things like circuit conductor imperfection), this will allow scientists to study quantum effects and interactions at room temperature.

* [Birds that almost don't sleep during longtime flights](http://www.sciencealert.com/scientists-have-just-seen-birds-sleep-while-flying-for-the-first-time-ever). I haven't know, but scientists have already known about birds' unique ability to sleep with only one hemisphere at a moment leaving another one working to be aware of predators and other threats. The article describes the first time when scientists could prove the hypothesis that birds can also sleep while flying. The most interesting thing about birds is not even their charming ability to proceed with moving in the right direction and sleep at the same moment, but to sleep only for about 40 minutes a day while the normal time exceeds this amount to about 10 times.
