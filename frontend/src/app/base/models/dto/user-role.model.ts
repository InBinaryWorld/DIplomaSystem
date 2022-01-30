import { Role } from './role.model';
import { WithId } from './id.model';

export interface UserRole extends WithId {
  role: Role;
}
