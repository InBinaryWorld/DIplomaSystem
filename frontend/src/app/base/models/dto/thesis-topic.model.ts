import { TopicStatus } from './topic-status.model';

export interface Thesis {
  id: string;
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
