const { Worker } = require("worker_threads");

class CustomPromise {
  constructor(executor) {
    this.state = "pending";
    this.value = undefined;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      if (this.state === "pending") {
        this.state = "fulfilled";
        this.value = value;
        this.onFulfilledCallbacks.forEach((fn) => fn());
      }
    };

    const reject = (reason) => {
      if (this.state === "pending") {
        this.state = "rejected";
        this.value = reason;
        this.onRejectedCallbacks.forEach((fn) => fn());
      }
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (value) => value;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (reason) => {
            throw reason;
          };

    return new CustomPromise((resolve, reject) => {
      const handleFulfilled = () => {
        queueMicrotask(() => {
          try {
            const result = onFulfilled(this.value);
            resolve(result);
          } catch (error) {
            reject(error);
          }
        });
      };

      const handleRejected = () => {
        queueMicrotask(() => {
          try {
            const result = onRejected(this.value);
            resolve(result);
          } catch (error) {
            reject(error);
          }
        });
      };

      if (this.state === "fulfilled") {
        handleFulfilled();
      } else if (this.state === "rejected") {
        handleRejected();
      } else {
        this.onFulfilledCallbacks.push(handleFulfilled);
        this.onRejectedCallbacks.push(handleRejected);
      }
    });
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }

  finally(onFinally) {
    return this.then(
      (value) => {
        onFinally();
        return value;
      },
      (reason) => {
        onFinally();
        throw reason;
      }
    );
  }

  static all(promises) {
    return new CustomPromise((resolve, reject) => {
      if (!Array.isArray(promises)) {
        return reject(new TypeError("Argument must be an array"));
      }
      let results = [];
      let completedPromises = 0;

      if (promises.length === 0) {
        resolve(results);
      } else {
        for (let i = 0; i < promises.length; i++) {
          CustomPromise.resolve(promises[i]).then(
            (value) => {
              results[i] = value;
              completedPromises++;
              if (completedPromises === promises.length) {
                resolve(results);
              }
            },
            (reason) => reject(reason)
          );
        }
      }
    });
  }

  static resolve(value) {
    if (value instanceof CustomPromise) {
      return value;
    }
    return new CustomPromise((resolve) => resolve(value));
  }
}

// Example usage
let promise1 = new CustomPromise((resolve) =>
  setTimeout(() => resolve("Promise 1"), 1000)
);
let promise2 = new CustomPromise((resolve) =>
  setTimeout(() => resolve("Promise 2"), 1000)
);
let promise3 = new CustomPromise((resolve) =>
  setTimeout(() => resolve("Promise 3"), 1000)
);
let promise4 = new CustomPromise((resolve) =>
  setTimeout(() => resolve("Promise 4"), 1000)
);
let promise5 = new CustomPromise((resolve) =>
  setTimeout(() => resolve("Promise 5"), 1000)
);

promise1.then((value) => {
  console.log(value, "Single Resolve"); // Promise 1 Single Resolve
});

CustomPromise.all([promise1, promise2, promise3, promise4, promise5])
  .then((results) => {
    console.log(results); // [ 'Promise 1', 'Promise 2', 'Promise 3', 'Promise 4', 'Promise 5' ]
  })
  .catch((error) => {
    console.error(error);
  });
