# CustomPromise - JavaScript Promise API Implementation by ChatGPT 4

## Overview

CustomPromise is a unique project that demonstrates the capabilities of AI in programming. This project is an experimentation in implementing a custom version of JavaScript's Promise object entirely written by ChatGPT 4.

## Features

- **AI-Generated Code:** Entirely written by ChatGPT 4, showcasing the potential of AI in coding.
- **Custom Implementation of Promises:** Mimics native JavaScript Promise functionality with an AI-designed structure.
- **Experimental and Educational:** Offers insights into how AI can be utilized in software development and provides a learning opportunity for those interested in AI's role in coding.

## Prompts used for implementation

1. Write Custom JavaScript Promise Implementation
2. Using set timeout is essential or we can optimize it to use more battle tested solutions? (Actually it uses set timeout in the first implementation)
3. It works, now i want to add finally method
4. Great, it works, Now I wanted to add a static method to CustomPromise class which takes an Array of CustomPromises and resolve them in parallel (All promises must be resolved, otherwise it should throw if any of the promises failed) and returns the array of resolved promises

## Usage

To experiment with CustomPromise, clone the repository, follow the steps:

```bash
git clone https://github.com/your-username/custom-promise.git
cd custom-promise
node promise.js
```

```js
import CustomPromise from "./path-to-CustomPromise";

// Example usage
const promise = new CustomPromise((resolve, reject) => {
  // Asynchronous task here
});
```
