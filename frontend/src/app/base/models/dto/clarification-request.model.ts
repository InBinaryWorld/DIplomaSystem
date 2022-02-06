import { BaseRequest } from './base-request.model';
import { IdType, IdTypeSerializer } from './id.model';
import { Thesis } from './thesis.model';
import { autoserialize, autoserializeAs, inheritSerialization } from 'cerialize';

@inheritSerialization(BaseRequest)
export class ClarificationRequest extends BaseRequest {

  @autoserializeAs(IdTypeSerializer)
  thesisId!: IdType;

  @autoserialize
  newTopic!: string;

  @autoserialize
  newDescription!: string;

  @autoserializeAs(Thesis)
  baseThesis!: Thesis;
}
