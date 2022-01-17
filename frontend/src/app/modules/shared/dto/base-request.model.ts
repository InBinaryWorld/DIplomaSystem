import { ApplicationState } from "./application-state.model";

export interface BaseRequest {
  id: string;
  submissionDate: Date;
  state: ApplicationState;
}
