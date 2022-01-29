import { createReducer, on } from '@ngrx/store';
import { failedReducerFn, startProgressReducer, successReducerFn } from '../../../core/store/base-store-state.model';
import { clearStoreAction } from '../../../core/store/clear-store.reducer';
import { RequestsState, RequestsStateByKey } from './requests.state';
import {
  invalidateRequestsDataAction,
  loadClarificationRequestsAction,
  loadClarificationRequestsFailedAction,
  loadClarificationRequestsSuccessAction
} from './requests.actions';
import { ClarificationRequest } from '../../models/dto/clarification-request.model';

export const RequestsFeatureName = 'requests';

export const initialState = new RequestsState();

export const requestsReducer = createReducer(
  initialState,
  on(loadClarificationRequestsAction, startProgressReducer()),
  on(loadClarificationRequestsFailedAction,
    (state, { error, key }) => failedReducerFn(state, error, setClValue(state, key))),
  on(loadClarificationRequestsSuccessAction,
    (state, { key, requests }) => successReducerFn(state, setClValue(state, key, requests))),
  on(invalidateRequestsDataAction,
    (state, { key }) => successReducerFn(state, setStateByKey(state, key))),
  on(clearStoreAction, () => initialState)
);


function setClValue(state: RequestsState, key: string, requests?: ClarificationRequest[]): Partial<RequestsState> {
  const newStateForKey = state.stateByKey[key] ?? new RequestsStateByKey();
  newStateForKey.clarificationRequests = requests;
  return setStateByKey(state, key, newStateForKey);
}

function setStateByKey(state: RequestsState, key: string, newStateForKey?: RequestsStateByKey): Partial<RequestsState> {
  const stateByKey = state.stateByKey;
  stateByKey[key] = newStateForKey ?? new RequestsStateByKey();
  return { stateByKey };
}
