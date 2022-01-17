import { ThesisTopic } from "./thesis-topic.model";
import { BaseRequest } from "./base-request.model";

export interface ChangeRequest extends BaseRequest {
  oldTopic: ThesisTopic;
  newTopic: ThesisTopic;
}
