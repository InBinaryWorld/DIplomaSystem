import { StudyDegree } from './study-degree.model';
import { IdType, WithId } from './id.model';

export class FieldOfStudy extends WithId {
  departmentId!: IdType;
  name!: string;
  degree!: StudyDegree;
}
