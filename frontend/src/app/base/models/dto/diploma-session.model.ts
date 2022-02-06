import { IdType, WithId } from './id.model';
import { FieldOfStudy } from './field-of-study.model';
import { Timetable } from './timetable.model';

export class DiplomaSession extends WithId {
  timetableId!: IdType;
  fieldOfStudyId!: IdType;
  year!: string;
  // additional fields
  fieldOfStudy!: FieldOfStudy;
  timetable!: Timetable;
}
