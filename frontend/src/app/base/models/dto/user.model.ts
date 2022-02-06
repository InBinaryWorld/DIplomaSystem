import { UserRole } from './user-role.model';
import { UserPerson } from './user-person.model';

export class User extends UserPerson {
  roles!: UserRole[];
}
