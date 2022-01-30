import { filter, OperatorFunction } from 'rxjs';
import { UserRole } from '../../base/models/dto/user-role.model';
import { Role } from '../../base/models/dto/role.model';
import { map } from 'rxjs/operators';

export function filterRole<T extends UserRole | undefined>(role: Role): OperatorFunction<T, NonNullable<T>> {
  return (source) => source.pipe(filter((v) => v?.role === role), map(v => v!));
}
