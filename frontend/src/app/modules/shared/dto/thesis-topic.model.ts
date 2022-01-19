import { TopicStatus } from "./topic-status.model";

export interface ThesisTopic {
  id: string;
  name: string;
  description?: string;
  numberOfStudents: number;
  status: TopicStatus;
  coordinatorComment?: string;
  submissionDate: Date;
  reportedByStudent: boolean;
}
