date: 2018-02-24
written: 2018-02-24
more: Leaving the "why?" behind the scene, let's jump right to "how".
template: article
futuretags: programming, css, styles, javascript, observing, mutationobserver

# Observing Style Changes 👁

While working on one of my inspirational OSS projects, I found out that there's currently no way to observe element style changes. At least I couldn't find any mentions of library-like solutions for that. I assume that the reason for that might be the fact it's hard to understand whether or not the styles have changed.

So, I decided to write my own library and called it `SauronStyle`. Please take a look and [give it a try](https://github.com/oleggromov/sauron-style) if you need anything like that for your project.

## How to Observe

Leaving the *why?* behind the scene, let's jump right to *how*. There're a few ways to update element styling I could remember:

- update its `class` or `style` directly
- update its parents' attributes, respectively
- insert or remove `style` or `link` elements anywhere in the document

In order to watch any of those, we need `MutationObserver` support - a DOM change observing interface supported in modern browsers (IE11+). I suppose that's the same that allows you to watch subtree or attribute modification in Elements pane of your favorite DevTools.

So what does it provide us with? Simply the ability to listen to attribute changes (`class` and `style` fall in this category) as well as subtree modifications (external stylesheet insertion on removal lives here).

## How to Check for a Difference

When we know *something has changed*, we should check if there are any *actual* changes since the changes we noticed might be totally unrelated. To do so, we will use `getComputedStyle` - a useful method on `window` supported by any modern browser starting IE9. What it does, is it returns a flat object of all CSS properties with values in a similar to CSS *computed* tab in Chrome.

Importantly, it returns a *live* [`CSSStyleDeclaration` instance](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration), which changes over time forcing us to keep a copy of it.

## Implementation sneak-peek

The actual [source code](https://github.com/oleggromov/sauron-style) lives in the repository, being rather compact by the way, but it might be interesting for you to see some details.

First of all, I want to observe the watched element attributes changes. This is achieved easily:

```javascript
this.mutationObserver = new window.MutationObserver(this.checkDiff)
this.mutationObserver.observe(this.node, {
  attributes: true,
  attributeFilter: ['style', 'class']
})
```

What this code does, is it creates a new instance of `MutationObserver` class and sends it a callback, `this.checkDiff`, as the only argument. Then it says: watch `this.node` for the changes in `style` and `class` attributes only and invoke the callback on these changes.

Later, in `this.checkDiff` we want to see if the actual styles have changed:

```javascript
checkDiff () {
  const newStyle = this.getStyle()
  const diff = getDiff(this.style, newStyle)

  if (Object.keys(diff).length) {
    if (this.subscriber) {
      this.subscriber(diff)
    }
    this.style = newStyle
  }
}
```

The code above gets the current style and compares it against the stored copy. Then, if there's any difference, we store the new one for the future and invoke a subscriber function if it has been set already.

`this.getStyle` returns a shallow copy of `this.computedStyle`.

```javascript
getStyle () {
  return getCopy(this.computedStyle)
}
```

Where `this.computedStyle` which is a reference to the mentioned above `CSSStyleDeclaration` instance:

```javascript
this.computedStyle = window.getComputedStyle(this.node)
```

### Observing Other Elements

It would be more or less it if we didn't care about other elements like parents' attribute changes or `style`/`link[rel=stylesheet]` insertion on removal. To do so, we need another entity, which I called `DocumentObserver`, to watch document subtree modifications including attribute changes. It looks like this in the class `constructor`:

```javascript
this.observer = new window.MutationObserver(mutations => mutations.forEach(this.observe.bind(this)))
this.observer.observe(window.document, {
  attributes: true,
  attributeFilter: ['class'],
  childList: true,
  subtree: true
})
```

It's quite similar to the other `MutationObserver` use case but here we treat every `mutation` separately and watch changes on `window.document`. Here we say roughly this: observe `class` attribute modifications and children insertion/removal for `window.document` and its children. Then call `this.observe` for any relevant mutation.

Observation code is very simple:

```javascript
observe (mutation) {
  if (mutation.type === 'childList') {
    this.checkElements(mutation)
  } else if (mutation.type === 'attributes') {
    this.invokeAll()
  }
}
```

Essentially, it checks the type of the mutation and proceeds to a corresponding branch. It's either call to `this.invokeAll`, which just invokes all subscribers, or a few additional checks aimed to call `this.invokeAll` only when a `link` or a `style` element is inserted.

This part, the `DocumentObserver`, is used from within `SauronStyle` like that:

```javascript
this.documentObserver = getDocumentObserver()
this.listenerId = this.documentObserver.addListener(this.checkDiff)
```

First, we use it as a singleton because we only have one document. Second, we subscribe the same `this.checkDiff` to relevant changes to the document.

## Issues

Well, this seems to work decently well but are there any problems?

First of all, the performance is low. We often call `getComputedStyle` and a call takes a few milliseconds, from 1 to 5-6 on my MacBook '2013. It's slow. Imagine a few thousand elements on a page which you want to observe. Will it take a few seconds to react to a DOM change? Yes, it will.

Second, the algorithm is more of proof-of-concept quality rather than production-ready. We call `checkDiff` method extensively, for any change in DOM that sometimes won't be related at all to the element we observe. I guess this additional computational complexity can be eliminated by computing and storing element styles outside DOM. But this could lead to more mistakes in difference detection and *much bigger* comprehension complexity.

I'm also not quite sure that I haven't forgotten any other ways to affect element styles.

## How to Help

- tell me if you have ever needed anything like that
- think and share your thoughts about any other possible ways of detecting style changes
- give [the library](https://github.com/oleggromov/sauron-style) a star on GitHub
- actually use it in one of your projects! 👻

Thanks for your attention!

P.S. This article is also (and originally) [published for Dev.to community](https://dev.to/oleggromov/observing-style-changes---d4f). Possibly, the discussion, if it starts, will happen there.
