import { createReducer, on } from '@ngrx/store';
import { setContextRole, setLanguageAction } from './session.actions';
import { successReducerFn } from '../../../core/store/base-store-state.model';
import { SessionState } from './session.state';
import { clearStoreAction } from '../../../core/store/clear-store.reducer';

export const SessionFeatureName = 'session';

export const initialState = new SessionState();

export const sessionReducer = createReducer(
  initialState,
  on(setContextRole, (state, { contextRole }) => successReducerFn(state, { contextRole })),
  on(setLanguageAction, (state, { language }) => successReducerFn(state, { language })),
  on(clearStoreAction, ({ language }) => ({ ...initialState, language }))
);
