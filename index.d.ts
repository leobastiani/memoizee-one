type WithClear<T> = T & { clear(): void };

export default function memoizeeOne<T extends (...args: any[]) => any>(
  fn: T,
  compareFn: (a: Parameters<T>, b: Parameters<T>) => boolean
): WithClear<T>;
export default function memoizeeOne<T extends (...args: any[]) => any>(
  fn: T
): WithClear<T>;

export function resetAll(): void;
