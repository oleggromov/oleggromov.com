date: 2018-03-03
written: 2018-03-03
more: asdas
template: article
futuretags: programming, tdd, typescript, javascript, jest

# TypeScript Initiation Guide

We all know that JavaScript's weak type system makes us developers produce a lot of unnecessary bugs. Possible options to tackle the issue are: quit your front-end developer gig (I wouldn't recommmend considering it seriously), turn into something compiled to Javascript like Elm (which is quite fun but actually *is* another programming language with totally different paradigm), **use strict typing systems such as TypeScript or Flow**, or believe in good luck and occasionally use good practices like mandatory linting and peer code-review before merging.

For quite a while I've been sticking around the last option but finally decided to turn the page. In this article I'll describe an approach to transforming a tiny codebase into TypeScript, including some nitty-gritty typing details and setting up the necessary tools.

## Start Small

First off, it would be hard if not impossible to convert a large codebase at once, especially if it's an actively developed project like the one you may be working on every day with numerous coworkers. The strategy in that case might be to divide and conquer, my favorite of all times, which is to start writing new code in TypeScript and converting legacy codebase file by file along with this. It's described decently in the [official migration guide](https://github.com/Microsoft/TypeScript-React-Conversion-Guide#typescript-react-conversion-guide).

However, applying a new technology usually brings some frustration and it might be better to first get used to it a little bit. I love this approach, and it's perfectly applicable to small personal projects that some of us already work on. If you've got something written in JavaScript and are interested in TypeScript, join along, or just keep reading about my experience of converting [SauronStyle](https://github.com/oleggromov/sauron-style) to TypeScript.

## The Goals

- set up code editor plugins
- translate the modules' code into TypeScript
- make sure tests works properly

## Editor Configuration

The TypeScript beauty and usefuleness comes primarily from the increased comprehension level it brings when you work with a strictly typed codebase. It includes things like real-time autocomplete suggestions and nice error checking and reporting right in your editor.

![Nice Sublime Editor Autocomplete](images/sublime-ts-autocomplete.jpg)

I usually use Sublime Text for small projects like SauronStyle. Its TypeScript support is empowered by a few plug-ins, and I chose one of them, [SublimeLinter-contrib-tslint](https://github.com/lavrton/SublimeLinter-contrib-tslint). I don't remember having any issues during the installation but you're very welcome with any questions regarding the set-up process.


## Setting Up Compilation with Webpack and TypeScript Compiler

SauronStyle is a small library that was initially written in ES2015, which was transpiled with Babel and bundled with Webpack. I wanted to keep module separation but rewrite the code in TypeScript. `tsc`, the TypeScript Compiler, supports modern JavaScript modern system so we just need to replace `babel-loader` with a typescript loader.

Install dependencies (replace `yarn` with `npm` if you use it):

```bash
yarn add -D awesome-typescript-loader typescript
```

Change module loader in your `webpack.config.js` accordingly:

```diff
  module: {
    loaders: [
      {
-        test: /\.js$/,
+        test: /\.(ts|js)$/,
        exclude: /node_modules/,
-        loader: 'babel-loader'
+        loader: 'awesome-typescript-loader'
      }
    ]
  },
```

In my simple case I just add `.ts` extension to the regexp so awesome-typescript-loader can also take care of regular JavaScript sources.

We also need to add `resolve` key so imports without an extension, such as `import MyClass from './MyClass'` can be handled properly.

```diff
+  resolve: {
+    extensions: ['.ts', '.js']
+  },
```

Since the [default value](https://webpack.js.org/configuration/resolve/#resolve-enforceextension) is `['.js', '.json']`, make sure to add `'.json'` as well in case your code imports JSON files without specifiying extensions.

The entry point for SauronStyle library is `src/sauron-style.js` but once we rewrite the main module into TypeScript too, it has to be changed to have the right extension:

```diff
-  entry: path.resolve(__dirname, 'src/sauron-style.js'),
+  entry: path.resolve(__dirname, 'src/sauron-style.ts'),
```

The last but not least is to set up the `tsconfig.json` file. It's described nicely in the official documentation but it might be useful to look into the one I came up with. Parts of it are scraped from the [migration guide](https://github.com/Microsoft/TypeScript-React-Conversion-Guide#configure-typescript) but I added a few options:

```json
{
  "compilerOptions": {
    "outDir": "./build/",
    "sourceMap": true,
    "strictNullChecks": true,
    "module": "es6",
    "target": "es5",
    "allowJs": true,
    "alwaysStrict": true,
    "strict": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  },
  "include": [
    "./src/"
  ],
  "exclude": [
    "node_modules"
  ]
}
```

I tried to make it as strict as possible and turn off as many implications as I can.

From now on, TypeScript Compiler must take care of both JavaScript *and* TypeScript source files, which enables seamless transition to the new language.

## Transition to TypeScript

Now we can start translating JS to TS. I'll show you a few examples and share some of the insights I've got during the transition but there're much better and profound sources of knowledge about the language:

- [Official TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/basic-types.html)
- [TypeScript Deep Dive opensource book](https://basarat.gitbooks.io/typescript/) by [Basarat Ali Syed](https://www.gitbook.com/@basarat)

SauronStyle consists of 2 modules that are interacting with the DOM, which means we most likely will need some type insights about the environment, and a small helper file called `object-utils.js`. Due to its size and simplicity, I decided to start with it. Take a look at a simple utility function exported from the module.

```javascript
export const getDiff = (a, b) => {
  let diff = {}
  for (let key in b) {
    if (b.hasOwnProperty(key) && b[key] !== a[key]) {
      diff[key] = {
        prev: a[key],
        cur: b[key]
      }
    }
  }
  return diff
}
```

It goes through the own properties of an object `b` and compares it to another object `a`. Then it returns an object of a particular shape that represents the difference:

```javascript
{
  a: {
    cur: 'old value',
    prev: 'new value'
  }
}
```

What TypeScripts offers, is a strong typing system that is applied to every single function and statement throughout your codebase and statically checked at the compilation stage and during the development process. For a developer it means that all the variables should be assigned a particular type: one of the [supported basic types](https://www.typescriptlang.org/docs/handbook/basic-types.html) or a [custom interface](https://www.typescriptlang.org/docs/handbook/interfaces.html), which is a TypeScript way of defining object shapes.

Let's start from creating a new interface for an object representing a difference between 2 objects. I will call it `DiffResult`, capitalized due to the naming convention:

```typescript
interface DiffResult {
  [key: string]: {
    prev: any,
    cur: any
  }
}
```

In the code piece above, `any` stands for any supported type, since we know that compared objects might have different types of property values. Fancy `[key: string]` rhymes with ES2015 [computed property names](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#Computed_property_names) and means that an object might have any string-defined keys.

TypeScript introduces a `value: Type` syntax to define types. We'll use it to rewrite the `getDiff` function:

```typescript
export const getDiff = (a: AnObject, b: AnObject): DiffResult => {
  let diff: DiffResult = {}
  for (let key in b) {
    if (b.hasOwnProperty(key) && b[key] !== a[key]) {
      diff[key] = {
        prev: a[key],
        cur: b[key]
      }
    }
  }
  return diff
}
```

I also added types to the function parameters and after the parentheses. `AnObject` just describes objects of any shape:

```typescript
interface AnObject {
  [key: string]: any
}
```

First I called it just `Object` but then there's a collision with [a built-in type](https://blog.mariusschulz.com/2017/02/24/typescript-2-2-the-object-type#object-vs-object-vs). There's also a lowercase `object` and `{}`, each with its own slightly different meaning, but none of them let me compile the source without errors. I'm not sure if having an *interface* for an object of any shape is a good way to achieve strictness so if you happen to know a better approach, please comment on this article.

It's also worth mentioning that TypeScript can *infer* a returned type of a function by simply analyzing its local varabiles, but it's better to [set the type explicitly](https://www.typescriptlang.org/docs/handbook/functions.html#function-types) from the very beginning so we you can keep your thoughts clean and the code concise.

## Using Type Assertion

Most likely, your common use cases for the TypeScript code interacting with external libraries and/or interfaces will be covered with either [built-in type definitions file `lib.d.ts`](https://basarat.gitbooks.io/typescript/docs/types/lib.d.ts.html) or [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped), a community-created type definitions for most popular JS libraries.

In same cases, though, it won't be enough. For example, the current definition of a global interface `Window` is apparantly lacking the `MutationObserver` notion. So I had to go for the folowing construction:

```typescript
this.mutationObserver = new (<any>window).MutationObserver(this.checkDiff)
```

Another example might be a function that checks if its argument is a link element pointing to a stylesheet:

```typescript
const isLink = (node: HTMLLinkElement): boolean =>
  node.tagName === 'LINK' && node.rel === 'stylesheet'
```

In my codebase it's called from another function, which receives a `NodeList` and calls `isLink` for every provided node, so I had to explicitly cast `Node`'s to `HTMLLinkElement`'s:

```typescript
const isLink = isLink(<HTMLLinkElement>node)
```

These constructions represent [type assertion](https://basarat.gitbooks.io/typescript/docs/types/type-assertion.html), where you tell the compiler "I know better what type you should treat the variable with". It can also be written in different syntax, `node as HTMLLinkElement`, so the angle braces don't collide with JSX.


## Configuring Jest to Work with TypeScript Modules

Finally, after we've translated the code into TypeScript, it's time to take care of the tests. I usally use Jest because it includes everything I need: a test runner, an assertion library, mocking helpers etc. And the process set-up is dead simple.

Probably some developers might conclude that since they've started using TypeScript, they should write tests in TS as well. I personally disagree with that at least because I cannot come up with any addition value it could possibly bring. If you have different observations, please share them in comments to this article.

The changes described above have broken the tests. The main reason is the removal of Babel with `.babelrc` so Jest simply doesn't understand imports that are yet unsupported in Node.js. In order to fix that, we're going to manually configure Jest to make it use `ts-jest` loader for the modules written in TypeScript. Let's install it first:

```bash
yarn add -D ts-jest
```

The [`ts-jest` module](https://github.com/kulshekhar/ts-jest) also has pretty neat documentation but I'll try to describe it here. The config lives in the `jest.config.js` file in the root folder, which I prefer over cluttered `package.json` with `jest` section. It looks like that:

```javascript
module.exports = {
  'transform': {
    '\\.[tj]s$': 'ts-jest'
  },
  'testRegex': '.*\\.test\\.js$',
  'testPathIgnorePatterns': [
    '/node_modules/',
    '/build/'
  ],
  'moduleFileExtensions': [
    'ts',
    'js'
  ]
}
```

The first line sets which files to transform. Both `.ts` source files *and* `.js` test cases need preliminary compilation. If we remove `.js` from the regexp, which would be correct as I though at first, jest won't know how to handle imports in the files.

Then, with `testRegex` and `testPathIgnorePatterns` we set which files to treat as tests and which to completely ignore.

Finally, `moduleFileExtensions` define how test runner will understand which modules to process. For some unknown reason, if we remove `.js` from the list, it stops seeing the tests again.

The very last part of the configuration will be the simplification of the `test:unit` script in `package.json`. I used to call it with a glob pattern to let Jest know which files to run before the config came into existence:

```diff
-    "test:unit": "node_modules/.bin/jest test/*",
+    "test:unit": "node_modules/.bin/jest",
```

Now that we have the standalone configuration file, it's not needed anymore.

## TypeScript Inspiration

There's plenty of other really useful and promising TypeScript features that are not described in the article. Here's an inspirational list for those who are serious about TypeScript:

- [Enumerations](https://www.typescriptlang.org/docs/handbook/enums.html)
- [Generics](https://www.typescriptlang.org/docs/handbook/generics.html), which look extremely similar to C++ templates at first sight
- [Mixins](https://www.typescriptlang.org/docs/handbook/mixins.html) and [decorators](https://www.typescriptlang.org/docs/handbook/decorators.html), which can probably ruin the beauty of functional JavaScript if used incorrectly
- [Linting](https://rjzaworski.com/2016/12/testing-typescript-with-jest#linting)
- [Writing tests in TypeScript](http://jonathancreamer.com/testing-typescript-classes-with-jest-and-jest-mocks/)

Please refer to the [official Handbook](https://www.typescriptlang.org/docs/handbook/basic-types.html) and the [Deep Dive](https://basarat.gitbooks.io/typescript/) book for additional information.

And feel free to share all of your thoughts and experience in the comments section!
