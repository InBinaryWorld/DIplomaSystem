import { WithId } from './id.model';

export class Teacher extends WithId {
  firstName!: string;
  lastName!: string;
  title!: string;
}
