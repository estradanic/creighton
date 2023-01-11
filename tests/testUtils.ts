import * as colors from "colors";
import * as deepEqual from "deep-equal";

const TAB_SPACES = "  ";
const ASSERTION_LEVEL = 3;
export const TEST_LEVEL = 2;
export const MODULE_LEVEL = 1;

export function error (level: number, ...message: string[]): void {
  console.error(...new Array(level).fill(TAB_SPACES), ...(message.map((m) => colors.red(m))));
}

export function ok (level: number, ...message: string[]): void {
  console.log(...new Array(level).fill(TAB_SPACES), ...(message.map((m) => colors.green(m))));
}

export function info (level: number, ...message: string[]): void {
  console.log(...new Array(level).fill(TAB_SPACES), ...(message.map((m) => colors.blue(m))));
}

export function assert (...conditions: boolean[]): boolean {
  return conditions.every((condition) => condition);
}

export function assertIsGreater (a: number, b: number, message: string): boolean {
  if (a <= b) {
    error(ASSERTION_LEVEL, message, `...FAIL: ${a} !> ${b}`);
    return false;
  }
  ok(ASSERTION_LEVEL, message, "...OK");
  return true;
}

export function assertIsLess (a: number, b: number, message: string): boolean {
  if (a >= b) {
    error(ASSERTION_LEVEL, message, `...FAIL: ${a} !< ${b}`);
    return false;
  }
  ok(ASSERTION_LEVEL, message, "...OK");
  return true;
}

export function assertTruthy (actual: any, message: string): boolean {
  if (!actual) {
    error(ASSERTION_LEVEL, message, `...FAIL: ${actual} is not truthy`);
    return false;
  }
  ok(ASSERTION_LEVEL, message, "...OK");
  return true;
}

export function assertFalsy (actual: any, message: string): boolean {
  if (actual) {
    error(ASSERTION_LEVEL, message, `...FAIL: ${actual} is not falsy`);
    return false;
  }
  ok(ASSERTION_LEVEL, message, "...OK");
  return true;
}

export function assertShallowEquals<T> (actual: T, expected: T, message: string): boolean {
  if (actual !== expected) {
    error(ASSERTION_LEVEL, message, `...FAIL: ${actual} !== ${expected}`);
    return false;
  }
  ok(ASSERTION_LEVEL, message, `...OK ${actual} === ${expected}`);
  return true;
};

export function assertDeepEquals<T> (actual: T, expected: T, message: string): boolean {
  if (!deepEqual(actual, expected)) {
    error(ASSERTION_LEVEL, message, `...FAIL: ${JSON.stringify(actual)} !== ${JSON.stringify(expected)}`);
    return false;
  }
  ok(ASSERTION_LEVEL, message, "...OK");
  return true;
}
