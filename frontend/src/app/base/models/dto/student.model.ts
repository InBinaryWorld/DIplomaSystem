import { IdType, IdTypeSerializer, WithId } from './id.model';
import { UserPerson } from './user-person.model';
import { FieldOfStudy } from './field-of-study.model';
import { autoserialize, autoserializeAs, inheritSerialization } from 'cerialize';

@inheritSerialization(WithId)
export class Student extends WithId {

  @autoserializeAs(IdTypeSerializer)
  userId!: IdType;

  @autoserialize
  indexNumber!: string;

  @autoserializeAs(IdTypeSerializer)
  fieldOfStudyId!: IdType;

  @autoserializeAs(UserPerson)
  user!: UserPerson;

  @autoserializeAs(FieldOfStudy)
  fieldOfStudy!: FieldOfStudy;
}
