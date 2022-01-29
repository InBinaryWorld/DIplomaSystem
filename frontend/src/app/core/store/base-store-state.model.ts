import { OnReducer } from '@ngrx/store/src/reducer_creator';
import { ActionType } from '@ngrx/store/src/models';

export abstract class BaseStoreState {
  isInProgress = false;
  error: any;
}

export function failedReducer<T extends BaseStoreState>(override: Partial<T> = {}): OnReducer<T, ActionType<any>> {
  return (state: T, { error }: ActionType<any>) => failedReducerFn(state, error, override);
}

export function startProgressReducer<T extends BaseStoreState>(override: Partial<T> = {}): OnReducer<T, ActionType<any>> {
  return (state: T, action: ActionType<any>) => ({ ...state, isInProgress: true, ...override });
}

export function successReducerFn<T extends BaseStoreState>(state: T, override: Partial<T> = {}): T {
  return { ...state, isInProgress: false, error: undefined, ...override };
}

export function failedReducerFn<T extends BaseStoreState>(state: T, error: any, override: Partial<T> = {}): T {
  return { ...state, isInProgress: false, error, ...override };
}

export function startProgressReducerFn<T extends BaseStoreState>(state: T, override: Partial<T> = {}): T {
  return { ...state, isInProgress: true, ...override };
}
