import { StudyDegree } from './study-degree.model';
import { IdType, WithId } from './id.model';

export interface FieldOfStudy extends WithId {
  departmentId: IdType,
  name: string,
  degree: StudyDegree,
  // active diploma session for field of study
  activeDiplomaSessionId: IdType
}
