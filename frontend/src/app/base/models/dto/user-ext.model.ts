import { UserRole } from './user-role.model';
import { UserPerson } from './user-person.model';

export interface User extends UserPerson {
  roles: UserRole[];
}
