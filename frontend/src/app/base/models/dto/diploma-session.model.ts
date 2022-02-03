import { IdType, WithId } from './id.model';

export interface DiplomaSession extends WithId {
  timetableId: IdType,
  fieldOfStudyId: IdType,
  year: string,
}
