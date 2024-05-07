// @ts-check

import assert from "node:assert";
import { test } from "node:test";
import memoizeeOne, { resetAll } from "./index.js";

test("success", () => {
  let calls = 0;
  const myMock = (/** @type {number} */ a) => {
    calls++;
    return a + 1;
  };
  const memoized = memoizeeOne(myMock);
  memoized(1);
  memoized(1);
  assert.strictEqual(calls, 1);
  assert.strictEqual(memoized(1), 2);
  memoized(2);
  assert.strictEqual(memoized(2), 3);
  assert.strictEqual(calls, 2);

  resetAll();
  memoized(2);
  assert.strictEqual(memoized(2), 3);
  assert.strictEqual(calls, 3);

  memoized.clear();
  memoized(2);
  assert.strictEqual(memoized(2), 3);
  assert.strictEqual(calls, 4);
});
