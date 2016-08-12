date: 2016-08-09 12:00
more:
template: article

# Bookmarks #3

## Pipes and filters data processing pattern

Imagine you have an appication that processes data from a few different sources. One, for instance, is user input and another one is database input that has come from the server. Initally those two data sources can have more differences than similarities, but eventually, I claim, they both will duplicate each others' functionality more or less, but in amout that is enough, for sure, to become a source of copy-paste errors.

Thinking about a problem of this class in my project I found an interesting and simple pattern named **Pipes and Filters**. The pattern in essence implements a very straigthforward idea of separating processing routines into different modules (namely *filters*) and combining them into chains (namely *pipes*). There can be two pipes (one for each source of input data) with a few filters in our simple example mentioned above.

This pattern is recommended to be used in distributed systems but it's pretty clear that the benefits (separation of concerns between different filters processing the same input, better code reuse posibilities and an opportunity to make modules loosely coupled) encourage us to use it even in a single-threaded environments like browsers that execute JavaScript programs.

### Sources
* [Microsoft's “Pipes and Filters” article on MSDN](https://msdn.microsoft.com/en-us/library/dn568100.aspx)
* [Pipe-and-Filter, by *Dossier Andreas*](http://www.dossier-andreas.net/software_architecture/pipe_and_filter.html)

## Photographs of old New York City pinned to the map

[Map of New York City historical photographs](https://www.oldnyc.org/). Looks very interesting, I wonder if someone ever make such a map for my home city and for the places where I grew in particular. Via [@bobuk](https://twitter.com/bobuk).

## You're OK, _by Mark Manson_

Mark claims the obvious thing to be true again (to have a problem is just OK), and again he is just in time to uncover my self-destructing thoughts about imperfection and having problems that should be immediately solved. Yes they should, although it shouldn't make me anxious about actually solving them, right now.

The interesting thing, as always in any personal related stuff, is that you're not alone with all these kinds of serious problems. Millions of people tend to think a lot about not being in any trouble at all, but this is just impossible. Everybody sometimes gets in trouble - physical, imaginary, of internal or external kind, but this just doesn't mean anything special. There's nothing wrong with you or me, we're just ordinary people who sometimes have ordinary problems. And that's OK.

[Read the full article by Mark Manson](https://markmanson.net/youre-okay).

## `git bisect` as a way to make binary search by repo for a mistake

I have never used it before, but `git bisect` seems to be a simple yet powerful tool for searching your long commit history for a particular one commit which produced a bug for the first time or introduced new feature. A [good explanation with an example of git bisect usage can also be found on Stack Overflow](http://stackoverflow.com/a/4714297). Originally the reference to `git bisect` was found on [@bessarabov's Facebook](https://www.facebook.com/ivanbessarabov).
