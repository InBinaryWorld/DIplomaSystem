import { filter, OperatorFunction } from 'rxjs';
import { UserRole } from '../../base/models/dto/user-role.model';
import { Role } from '../../base/models/dto/role.model';
import { map } from 'rxjs/operators';

export function extractRoleId<T extends UserRole | undefined>(role: Role): OperatorFunction<T, string> {
  return (source) => source.pipe(
    filter((value) => value?.role === role),
    map(userRole => userRole!.id)
  );
}
