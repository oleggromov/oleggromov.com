date: 2016-03-08 18:00
more: Already understood what happens?
template: article

# Testable Modules via Dependency Injection

One of the signs of a good code is it's loosely-coupled nature as far as it even possible at all. But why do we think about loose coupling? What's the profit of making pieces of code isolated from each other? The answer is, the module *testability* or, more generally speaking, the *maintainability* of the code.

One should want to make his code maintainable, especially in specific development environments like open-source community. There're some benefits:

- any part of the program can be easily updated without touching other parts (what is properly called *encapsulation*);
- anybody from the community can make a useful (hopefully) addition without even mentioning of the other parts existence or even more understanding how they work;
- splitting code into pieces those can *really be separated* from others hints us about the clearness of the initial though behind that code, it implicitly shows us that the author of the code had though hard on it;
- maintainability itself is a self-explanatory term, which refers to a *possibility of changing the code behavior or structure with ease*.

The last feature is actually the greatest one because it's impossible to predict the future of the constructed system. But one ought to predict the system's unsteady nature and it inclination for change.

## Enough! Show me the code!

Consider the following module

## What do you think
Have something to say on this way of isolating module in the test environment? Please share with us your thoughts!