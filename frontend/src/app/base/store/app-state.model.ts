import { AuthFeatureName } from './auth/auth.reducer';
import { AuthState } from './auth/auth.state';
import { SessionFeatureName } from './session/session.reducer';
import { SessionState } from './session/session.state';

export interface AppState {
  [AuthFeatureName]: AuthState;
  [SessionFeatureName]: SessionState;
}
