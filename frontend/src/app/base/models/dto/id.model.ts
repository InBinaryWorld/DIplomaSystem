import { autoserializeAs, ISerializable } from 'cerialize';

export type IdType = string;

export const IdTypeSerializer: ISerializable = {
  Serialize: (value: IdType) => Number(value),
  Deserialize: (json: number) => String(json)
};

export class WithId {

  @autoserializeAs(IdTypeSerializer)
  id!: IdType;
}
