import { TopicStatus } from './topic-status.model';
import { WithId } from './id.model';

export interface Thesis extends WithId {
  supervisorId: string;
  diplomaSessionId: string;
  authorStudentId?: string;
  topic: string;
  description: string;
  numberOfStudents: number;
  status: TopicStatus;
  coordinatorComment?: string;
  submissionDate: Date;
  reportedByStudent: boolean;
}
