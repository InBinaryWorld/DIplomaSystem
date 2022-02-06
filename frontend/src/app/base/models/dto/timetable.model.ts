import { IdType, IdTypeSerializer, WithId } from './id.model';
import { autoserializeAs, inheritSerialization } from 'cerialize';

@inheritSerialization(WithId)
export class Timetable extends WithId {

  @autoserializeAs(IdTypeSerializer)
  diplomaSessionId!: IdType;

  @autoserializeAs(Date)
  submittingThesis!: Date;

  @autoserializeAs(Date)
  approvingThesisByCoordinator!: Date;

  @autoserializeAs(Date)
  approvingThesisByCommittee!: Date;

  @autoserializeAs(Date)
  selectingThesis!: Date;

  @autoserializeAs(Date)
  clarificationThesis!: Date;

  @autoserializeAs(Date)
  changingThesis!: Date;
}
