import { IdType, WithId } from './id.model';

export interface Student extends WithId {
  userId: IdType,
  indexNumber: string,
  fieldOfStudyId: IdType,
  // active diploma session for field of study
  activeDiplomaSessionId: IdType
}
