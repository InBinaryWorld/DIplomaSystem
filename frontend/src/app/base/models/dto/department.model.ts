import { WithId } from './id.model';

export interface Department extends WithId {
  name: string,
  number: string,
}
