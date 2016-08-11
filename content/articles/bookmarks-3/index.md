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

## Beautiful

[https://www.oldnyc.org/](Map of New York City historical photographs). Looks very interesting, I wonder if someone ever make such a map for my home city and for the places where I grew in particular. Via [https://twitter.com/bobuk](@bobuk).