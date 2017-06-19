date: 2017-06-18
written: 2017-06-18
more:
template: article

# Declarativity Comes at a Price

There is a widely held notion, and I agree, that declarative code is better than imperative. It is less error-prone, usually much more eloquent and neat and thus much more maintainable. Oftentimes when people try to reason someone to rewrite a piece of imperative code, they come up with examples like below.

*Declarative is good:*
```(js)
const numbers = [1, 2, 3, 4, 5]
const powers = numbers.map(function (number) {
  return number * number
})
```

*Imperative is evil:*
```(js)
const numbers = [1, 2, 3, 4, 5]
let powers = []

for (let i = 0; i < numbers.length; i++) {
  powers.push(numbers[i] * numbers[i])
}
```

Look, `map`-based version is much more precise, you actually have only one line of computational code (`return number * number`) and one line of glue code (`const powers = numbers.map(...)`). Isn't it great? So how come you decide that your freakin' imperative crap is better?

No, it isn't necessarily better. But no one usually argues about such simple things. The more complex task you want to solve using declarative approach, the more complex "configs" you have to write and the more complicated code you need underneath to make it work. With that said, I claim that **declarativity comes with a price**, and you're lucky if it is not you who pays it. I will try to illustrate the idea with a few hopefully persuading examples.

## A Configurable Form

When I started working on [Counter application](/projects/counter), I didn't think that the project UI would need more than one `<form />`. I started from the `List` screen where you enter expenses related to one place/time and forgot about the `Main` screen where you can create those lists. So first I came up with a simple `SpentForm` component code. I'm intentionally omitting the details to make the example clearer.



<!-- Whenever you could write a description of a process (i.e. make a declaration) instead of imperatively defining it step-by-step, you should do that.
 -->