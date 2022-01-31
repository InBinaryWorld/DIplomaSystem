import { ThesisStatus } from './topic-status.model';
import { WithId } from './id.model';

export interface Thesis extends WithId {
  supervisorId: string;
  diplomaSessionId: string;
  authorStudentId?: string;
  topic: string;
  description: string;
  numberOfStudents: number;
  status: ThesisStatus;
  coordinatorComment?: string;
  submissionDate: Date;
  reportedByStudent: boolean;
}
