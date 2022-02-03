import { WithId } from './id.model';

export interface UserPerson extends WithId {
  firstName: string;
  lastName: string;
}
