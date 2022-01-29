import { TopicStatus } from './topic-status.model';

export interface ThesisTopic {
  id: string;
  supervisorId: string;
  diplomaSessionId: string;
  authorStudentId?: string;
  name: string;
  description: string;
  numberOfStudents: number;
  status: TopicStatus;
  coordinatorComment?: string;
  submissionDate: Date;
  reportedByStudent: boolean;
}
