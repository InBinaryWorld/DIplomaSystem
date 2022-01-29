import { UserRole } from './user-role.model';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  roles: UserRole[];
}
