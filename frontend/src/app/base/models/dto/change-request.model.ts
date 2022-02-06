import { BaseRequest } from './base-request.model';
import { IdType, IdTypeSerializer } from './id.model';
import { Thesis } from './thesis.model';
import { autoserializeAs, inheritSerialization } from 'cerialize';

@inheritSerialization(BaseRequest)
export class ChangeRequest extends BaseRequest {

  @autoserializeAs(IdTypeSerializer)
  oldThesisId!: IdType;

  @autoserializeAs(IdTypeSerializer)
  newThesisId!: IdType;

  @autoserializeAs(Thesis)
  newThesis!: Thesis;

  @autoserializeAs(Thesis)
  previousThesis!: Thesis;
}
