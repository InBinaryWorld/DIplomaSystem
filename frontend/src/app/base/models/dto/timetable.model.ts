import { WithId } from './id.model';

export interface Timetable extends WithId {
  diplomaSessionId: string;
  submittingThesis: Date;
  approvingThesisByCoordinator: Date;
  approvingThesisByCommittee: Date;
  selectingThesis: Date;
  clarificationThesis: Date;
  changingThesis: Date;
}
