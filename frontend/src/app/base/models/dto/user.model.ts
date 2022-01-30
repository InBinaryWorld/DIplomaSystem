import { UserRole } from './user-role.model';
import { WithId } from './id.model';

export interface User extends WithId {
  firstName: string;
  lastName: string;
  roles: UserRole[];
}
