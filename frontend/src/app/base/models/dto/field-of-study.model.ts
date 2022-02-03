import { StudyDegree } from './study-degree.model';
import { IdType, WithId } from './id.model';

export interface FieldOfStudy extends WithId {
  departmentId: IdType,
  name: string,
  degree: StudyDegree,
  // additional
  activeDiplomaSessionId: IdType
}
