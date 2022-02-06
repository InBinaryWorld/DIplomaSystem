import { autoserializeAs } from 'cerialize';
import { IdType, IdTypeSerializer } from '../id.model';

export class CreateReservation {

  @autoserializeAs(IdTypeSerializer)
  thesisId!: IdType;

  @autoserializeAs(IdTypeSerializer)
  studentIds!: IdType[];
}
