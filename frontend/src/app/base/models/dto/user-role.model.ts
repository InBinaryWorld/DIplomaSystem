import { Role } from './role.model';
import { WithId } from './id.model';

export class UserRole extends WithId {
  role!: Role;
}
