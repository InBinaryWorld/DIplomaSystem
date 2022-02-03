import { IdType, WithId } from './id.model';
import { UserPerson } from './user-person.model';
import { FieldOfStudy } from './field-of-study.model';

export interface Student extends WithId {
  userId: IdType,
  indexNumber: string,
  fieldOfStudyId: IdType,
  // additional
  user: UserPerson,
  fieldOfStudy: FieldOfStudy;
}
