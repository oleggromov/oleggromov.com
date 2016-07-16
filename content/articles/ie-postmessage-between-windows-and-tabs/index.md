date: 2015-02-12 23:21
more: How to fix broken postMessage in IE 8-11
page: articles/item

# IE postMessage between windows and tabs

IE supports window.postMessage—the **cross-origin communication** method since the 8th version. But it doesn’t support messaging between tabs or windows. The reason is, the Loosely Coupled IE feature which made the browser more stable (each tab or window has its own process) but also made communication between different windows or tabs nearly impossible.

Even today, when the last version’s global market share is more than 20 per cent and the 8-10 versions together own about 30 per cent, the bug isn’t fixed yet. The interesting question is, will postMessage work with the upcoming Spartan or not, but anyhow, we have to and will be obliged to work with those legacy 8 to 11 versions of Internet Explorer.

Together with postMessage, localStorage doesn’t work as expected too. I haven’t found a method to make it instantly reflect changes, as it should, in different windows. This is not a topic of this article, but as you will see later, broken localStorage confused me a bit.

## How to fix broken postMessage in IE 8-11

The goal is simple: to get a working method of cross-origin and cross-window communication in modern IEs. I also don’t want to use any back-end techniques, so the solution will be client-side only.

Imagine a site, call it parent.com, that wants to open another one, for instance child.com, and send a message to it. If parent creates an iframe with src set to child.com, it can take an iframe’s window reference and call its postMessage method which works. But once parent.com opens child.com in window or tab (using window.open), it loses the ability to send message. But what about an iframe? Maybe we can use the possibility to send a message to iframe?

Yes, we can and this is the key to the solution. Luckily, postMessage works good enough to communicate with iframes in IE. Therefore, parent.com should open two instances of child.com those can talk to each other using instantly synchronized cookies. The first instance is opened for the user needs, another one occupies an invisible iframe and starts polling waiting for cookie to change.

Some event then occurs in child window, e.g. user clicks the button, and child.com wants to inform its opener, “the button is clicked”. In the working environment, it simply calls window.parent.postMessage with the required message. Otherwise, once IE is detected, child sets the cookie with validly specified name and content.

The child window which is opened in iframe catches cookie change by means of polling. Once the message is caught, listener removes the cookie and sends the message to its parent. Parent then can properly dispatch the message, as it has been sent from the window itself.

The maximum cookie size is big enough to temporarily contain any message, so the problem is solved roughly.
