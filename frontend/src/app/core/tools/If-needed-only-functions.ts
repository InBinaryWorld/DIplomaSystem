import { IfNeededOnlyPayload } from '../store/if-needed-payload.model';
import { mergeMap, Observable, of } from 'rxjs';
import { filter, first, map, switchMap } from 'rxjs/operators';
import { isNotNil } from './is-not-nil';

const innerAction = <T extends IfNeededOnlyPayload, O>(action: T, valueFn: (action: T) => Observable<O>, testFn: (value: O) => boolean) => {
  if (!action.ifNeededOnly) {
    return of(action);
  }
  return valueFn(action).pipe(
    first(),
    filter(testFn),
    map(() => action)
  );
};

export function ifNeededSwitchNotNil<T extends IfNeededOnlyPayload, O>(condition: (action: T) => Observable<O>) {
  return switchMap<T, Observable<T>>(action => innerAction(action, condition, isNotNil));
}

export function ifNeededMergeNotNil<T extends IfNeededOnlyPayload, O>(condition: (action: T) => Observable<O>) {
  return mergeMap<T, Observable<T>>(action => innerAction(action, condition, isNotNil));
}

export function ifNeededSwitch<T extends IfNeededOnlyPayload, O>(action: T, valueFn: (action: T) => Observable<O>, testFn: (value: O) => boolean) {
  return switchMap<T, Observable<T>>(action => innerAction(action, valueFn, testFn));
}

export function ifNeededMerge<T extends IfNeededOnlyPayload, O>(action: T, valueFn: (action: T) => Observable<O>, testFn: (value: O) => boolean) {
  return mergeMap<T, Observable<T>>(action => innerAction(action, valueFn, testFn));
}
