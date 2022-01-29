import { filter, MonoTypeOperatorFunction } from 'rxjs';
import { isNotNil } from './is-not-nil';

export function filterExists<T>(): MonoTypeOperatorFunction<T> {
  return filter(value => isNotNil(value));
}
