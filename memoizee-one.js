import areInputsEqual from "./are-inputs-equal.js";
import { resets } from "./reset.js";

function memoizeeOne(fn, compareFn = areInputsEqual) {
  let last;

  function memoized(...args) {
    if (last && compareFn(args, last.args)) {
      if (last.return) {
        return last.return;
      }
      throw last.error;
    }

    last = { args };
    if (process.env.NODE_ENV !== "production") {
      resets.add(memoized);
    }
    try {
      last.return = fn.apply(this, args);
      return last.return;
    } catch (error) {
      last.error = error;
      throw error;
    }
  }

  memoized.clear = function clear() {
    last = undefined;
  };

  return memoized;
}

export default memoizeeOne;
