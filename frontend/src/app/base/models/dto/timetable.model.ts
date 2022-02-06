import { IdType, WithId } from './id.model';

export class Timetable extends WithId {
  diplomaSessionId!: IdType;
  submittingThesis!: Date;
  approvingThesisByCoordinator!: Date;
  approvingThesisByCommittee!: Date;
  selectingThesis!: Date;
  clarificationThesis!: Date;
  changingThesis!: Date;
}
