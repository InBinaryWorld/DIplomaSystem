import { ThesisTopic } from "./thesis-topic.model";
import { BaseRequest } from "./base-request.model";

export interface ClarificationRequest extends BaseRequest {
  topic: ThesisTopic;
  newName?: string;
  newDescription?: string;
}
