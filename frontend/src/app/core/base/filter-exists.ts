import { filter, MonoTypeOperatorFunction } from "rxjs";
import { isNotNil } from "./isNotNil";

export function filterExists<T>(): MonoTypeOperatorFunction<T> {
  return filter(value => isNotNil(value));
}
