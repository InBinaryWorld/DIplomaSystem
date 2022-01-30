import { WithId } from './id.model';

export interface DiplomaSession extends WithId {
  timetableId: string,
  fieldOfStudyId: string,
  year: string,
}
