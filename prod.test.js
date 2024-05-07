// @ts-check

import assert from "node:assert";
import { test } from "node:test";
import memoizee from "./index.js";

test("success", () => {
  let calls = 0;
  const myMock = (/** @type {number} */ a) => {
    calls++;
    return a + 1;
  };
  const memoized = memoizee(myMock);
  memoized(1);
  memoized(1);
  assert.strictEqual(calls, 1);
  memoized(2);
  assert.strictEqual(calls, 2);
  assert.strictEqual(memoized(2), 3);
});

test("with different this", () => {
  let calls = 0;
  function fn(/** @type {number} */ a) {
    calls++;
    // @ts-expect-error
    return [this, a + 1];
  }
  const memoized = memoizee(fn);
  const this1 = {};
  memoized.call(this1, 1);
  assert.strictEqual(memoized(1)[0], this1);
  assert.strictEqual(memoized(1)[1], 2);
  assert.strictEqual(calls, 1);

  const this2 = {};
  memoized.call(this2, 2);
  assert.strictEqual(memoized(2)[0], this2);
  assert.strictEqual(memoized(2)[1], 3);
  assert.strictEqual(calls, 2);

  memoized.clear();
  memoized(2);
  assert.strictEqual(memoized(2)[0], undefined);
  assert.strictEqual(memoized(2)[1], 3);
  assert.strictEqual(calls, 3);
});
