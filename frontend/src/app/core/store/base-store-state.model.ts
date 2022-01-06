export abstract class BaseStoreState {
  isInProgress = false;
  error: any;
}

export function successReducer<T extends BaseStoreState>(state: T, override: Partial<T> = {}): T {
  return { ...state, isInProgress: false, error: undefined, ...override };
}

export function failedReducer<T extends BaseStoreState>(state: T, error: any, override: Partial<T> = {}): T {
  return { ...state, isInProgress: false, error, ...override };
}

export function startProgressReducer<T extends BaseStoreState>(state: T, override: Partial<T> = {}): T {
  return { ...state, isInProgress: true, ...override };
}
