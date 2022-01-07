import { TopicStatus } from "./topic-status.model";

export interface ThesisTopic {
  id: string;
  name: string;
  description?: string;
  personCount: number;
  status: TopicStatus;
  coordinatorComment?: string;
  fillingDate: Date;
  reportedByStudent: boolean;
}
