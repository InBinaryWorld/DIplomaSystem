import { IdType, WithId } from './id.model';
import { FieldOfStudy } from './field-of-study.model';

export interface DiplomaSession extends WithId {
  timetableId: IdType,
  fieldOfStudyId: IdType,
  year: string,
  // additional fields
  fieldOfStudy: FieldOfStudy;
}
