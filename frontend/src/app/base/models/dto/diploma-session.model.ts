import { IdType, IdTypeSerializer, WithId } from './id.model';
import { FieldOfStudy } from './field-of-study.model';
import { Timetable } from './timetable.model';
import { autoserialize, autoserializeAs, inheritSerialization } from 'cerialize';

@inheritSerialization(WithId)
export class DiplomaSession extends WithId {

  @autoserializeAs(IdTypeSerializer)
  timetableId!: IdType;

  @autoserializeAs(IdTypeSerializer)
  fieldOfStudyId!: IdType;

  @autoserialize
  year!: string;

  @autoserializeAs(FieldOfStudy)
  fieldOfStudy!: FieldOfStudy;

  @autoserializeAs(Timetable)
  timetable!: Timetable;
}
