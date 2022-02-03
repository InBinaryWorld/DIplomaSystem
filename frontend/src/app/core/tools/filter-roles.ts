import { filter, OperatorFunction } from 'rxjs';
import { UserRole } from '../../base/models/dto/user-role.model';
import { Role } from '../../base/models/dto/role.model';
import { map } from 'rxjs/operators';
import { filterExists } from './filter-exists';

export function filterRoles<T extends UserRole | undefined>(roles: Role[]): OperatorFunction<T, NonNullable<T>> {
  return (source) => source.pipe(
    filterExists(),
    filter((v) => roles.includes(v.role)),
    map(v => v!));
}
