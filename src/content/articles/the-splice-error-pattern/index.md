<!---
{
	"date": "2016-02-09 21:00",
	"more": "Already understood what happens?",

	"page": "articles/item"
}
-->
# The splice error pattern

Imagine you’re writing an algorithm which performs looping over an array with any type of pointer (for or while loop, forEach, map etc). Each iteration the pointer moves in any direction, but you never force it to come back in the most of cases. Why should you? This mode of manipulating data is so much usual that your probably have never ever thought of its liability to hard-to-find annoying errors which will lead you toward wearing debugging!

The erroneous pattern is very simple and obvious. Say you need to map some action to all array elements and write.


```javascript
var arr = [1, 2, 3];
arr.forEach(act);

function act(item) {
	console.log(item);
}
```

This will simply iterate through an array of numbers and call act function by turns with each item as an argument. Very obvious, isn’t it? The thing works fine until the function doesn’t change anything. But the problem appears once you decide to change something in the array (e.g. remove unused empty elements) retaining this algorithm. You modify the callback in the following way.

```javascript
function act(item, index) {
	if (item) {
		console.log(item);
	} else {
		arr.splice(index, 1);
	}
}
```

The new version of act will print an element if it exists but also take care of absent or empty elements by removing them from an array. The splice method is a good choice to do such type of manipulation. Even if you stare at this code for a minute you maybe won’t exhibit it’s deceptive nature. Intuitively the way of moving through array items one by one seems possibly the most safe way of doing something. But wait. What if an array can be changed during the manipulation?

My guess is you’ve already understood what happens in that case. The forEach method implicitly (or for loop explicitly in turn) moves the iterator over an elements of array, counting from the first one to the last one. Until we have an array of truthy values nothing can happen with the defined above function. But a single element will be skipped for each falsy one in an array! The act method called on the [1, undefined, 3, 4, undefined, 5] array will only log «1» and «4» because it latently moves the pointer as often as encounters an empty element by deleting it, and thus changes the array length and omits an item.


## Quick fix

I consider there’re a few options of how to deal with those cases.

This first one is to modify for loop to empower it to check if the array length was changed and then shift the pointer. I don’t like this way because it’s too awkward and shitty — conceive you’re decided to manipulate an array in another method, but the looping part for some reason should know about external manipulation possibility.

The second approach is to lock the array like in concurrent computing until the loop is over. It is rather complicated for such pristine algorithm, although far more conscientious.

The third one I prefer is not to modify array’s length at all, but replace an item with undefined value instead of it. It is very simple and seems more efficient if we suppose an array could be large.


## What do you think
Have something to say on this erroneous pattern? Please use the comment form below to share your thoughts!