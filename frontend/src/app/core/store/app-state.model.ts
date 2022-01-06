import { SessionFeatureName } from "../../modules/login/store/session.reducer";
import { SessionState } from "../../modules/login/models/session-state.model";

export interface AppState {
  [SessionFeatureName]: SessionState;
}
