date: 2017-07-02
written: 2017-06-20
more: Read the answer to the one of the most important questions in a developer's life
template: article
futuretags: programming, dogma

# Declarativity Comes at a Price

There is a widely held notion, and I agree, that declarative code is better than imperative. It is less error-prone, usually much more eloquent and neat and thus much more maintainable. It is a good principle to follow on a day-to-day basis when you use existing declarative libraries like the JavaScript standard library (`Array`/`Object` methods etc.), underscore/lodash or React. However, when it comes to making a decision to either write some declarative code (and therefore much more generalized) or just leave an imperative ad hoc solution, I suggest thinking at least twice.

Every algorithm has specific complexity; not only does it have computational complexity (declared by means of time/memory it takes to run on different input sizes), but also a *complexity of writing and understanding the code* that implements it. The latter primarily falls to programmers who work with the code, and in the world of budgets and deadlines is also a valid point of concern.

What I state in this article’s title, *declarativity comes at a price*, can be split in a few theses.

## Implementation Cost Might Be Higher

Whenever you decide to write something declaratively and have already implemented required primitives, like `map` or `filter` for arrays, you might be fine. Someone has already spent time writing and debugging it, and the only thing is left to do is understand how these primitives work and build your own algorithm of these small pieces. What is even better, once you understand how these building blocks work you acquire a rare skill of writing concise code with ease, which must be appreciated by virtually any good programmer in the world.

On the other hand, when a problem you’re solving or a solution you’re picking is not so common and you cannot find needed “blocks”, you might be facing a tough decision of implementing them on your own. Sometimes generalization and abstraction require much more effort you will or can make.

## Comprehension and Debugging Price Might Be Higher

Declarative code looks clearer at first glance but this impression is likely to change when it comes to deep comprehension and debugging. Simple things like `map` or `filter` are relatively well known and understood, more complex things like React’s component lifecycle are much more sophisticated, and self-implemented and likely not documented and/or tested primitives can be your worst nightmare. You might end up unraveling abstractions your coworker came up with a long time ago or even rewriting them in order to make it work as you expect.

Generalized solutions of abstract problems, which declarative code comprises in essence, are hard. When you generalize an idea and explain it to your friend you might simplify it as well for sake of understanding; when you generalize algorithm, on the other hand, you likely create more and more edge cases because otherwise the code won’t work. It leads to more complications compared to an original smaller issue, more tests to be written and more time to be spent comprehending.

And furthermore, we love eloquence and neatness in our code. A generalized solution might be not so good in the first place and you’ll spend hours to make it look better, whereas the original problem’s solution could have taken only a few minutes.

## Conclusion

Don’t get me wrong, I agitate neither against declarative code nor for it. Just be aware of the costs. When you’re lucky to have necessary tools, go ahead and use them. When you encounter a stinky imperative code in your shiny declarative React app, you most likely have a reason to be concerned. Just try to think twice and make a deliberate decision. We won’t get closer to good and working code just echoing dogmas that are being said on every corner. Considering implementation and comprehension and debugging costs, on the other hand, might help to come up with the right decision, whether it is leaving the code as is or paying the price for making it declarative and more generalized.
