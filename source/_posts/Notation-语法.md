title: Notation-语法
date: 2018-11-09 11:46:30
categories:
- Javascript
tags:
- 语法
---

#### 面试题引起的f\*ck
 Examples
[] is equal ![]

Array is equal not array:

[] == ![]; // -> true ( What The f\*ck Javascript )

💡 Explanation:

The abstract equality operator converts both sides to numbers to compare them, and both sides become the number 0 for different reasons. Arrays are truthy, so on the right, the opposite of a truthy value is false, which is then coerced to 0. On the left, however, an empty array is coerced to a number without becoming a boolean first, and empty arrays are coerced to 0, despite being truthy.

Here is how this expression simplifies:

+[] == +![];
0 == +false;
0 == 0;
true;

See also [] is truthy, but not true.
<!-- more -->
