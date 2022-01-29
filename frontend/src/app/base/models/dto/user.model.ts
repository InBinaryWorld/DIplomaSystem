import { UserRole } from './user-role.model';

export interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  roles: UserRole[];
}
