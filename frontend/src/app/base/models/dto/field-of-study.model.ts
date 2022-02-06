import { StudyDegree } from './study-degree.model';
import { IdType, IdTypeSerializer, WithId } from './id.model';
import { autoserialize, autoserializeAs, inheritSerialization } from 'cerialize';

@inheritSerialization(WithId)
export class FieldOfStudy extends WithId {

  @autoserializeAs(IdTypeSerializer)
  departmentId!: IdType;

  @autoserialize
  name!: string;

  @autoserializeAs(StudyDegree)
  degree!: StudyDegree;
}
