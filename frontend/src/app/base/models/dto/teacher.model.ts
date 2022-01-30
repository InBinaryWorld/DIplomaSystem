import { WithId } from './id.model';

export interface Teacher extends WithId {
  firstName: string,
  lastName: string,
  title: string
}
