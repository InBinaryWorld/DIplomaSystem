import { SessionData } from './session-data.model';
import { BaseStoreState } from "../../../core/store/base-store-state.model";

export class SessionState extends BaseStoreState {
  sessionData?: SessionData;
}
