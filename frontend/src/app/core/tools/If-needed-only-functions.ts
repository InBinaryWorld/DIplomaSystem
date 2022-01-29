import { mergeMap, Observable } from 'rxjs';
import { filter, first, map, switchMap } from 'rxjs/operators';
import { isNotNil } from './is-not-nil';

const innerAction = <T, O>(action: T, valueFn: (action: T) => Observable<O>, testFn: (value: O) => boolean) => {
  return valueFn(action).pipe(first(), filter(testFn), map(() => action));
};

export function switchIfNotNil<T, O>(condition: (action: T) => Observable<O>) {
  return switchMap<T, Observable<T>>(action => innerAction(action, condition, isNotNil));
}

export function mergeIfNotNil<T, O>(condition: (action: T) => Observable<O>) {
  return mergeMap<T, Observable<T>>(action => innerAction(action, condition, isNotNil));
}

export function switchIf<T, O>(action: T, valueFn: (action: T) => Observable<O>, testFn: (value: O) => boolean) {
  return switchMap<T, Observable<T>>(action => innerAction(action, valueFn, testFn));
}

export function mergeIf<T, O>(action: T, valueFn: (action: T) => Observable<O>, testFn: (value: O) => boolean) {
  return mergeMap<T, Observable<T>>(action => innerAction(action, valueFn, testFn));
}
