import { autoserialize, autoserializeAs } from 'cerialize';
import { IdType, IdTypeSerializer } from '../id.model';

export class CreateClarificationRequest {

  @autoserializeAs(IdTypeSerializer)
  topicId!: IdType;

  @autoserializeAs(IdTypeSerializer)
  studentId!: IdType;

  @autoserialize
  newTopic!: string;

  @autoserialize
  newDescription!: string;
}
