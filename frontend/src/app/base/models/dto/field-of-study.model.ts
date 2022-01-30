import { StudyDegree } from './study-degree.model';
import { WithId } from './id.model';

export interface FieldOfStudy extends WithId {
  departmentId: string,
  name: string,
  degree: StudyDegree,
}
