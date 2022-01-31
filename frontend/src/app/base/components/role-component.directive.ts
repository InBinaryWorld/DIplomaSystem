import { ChangeDetectorRef, Directive } from '@angular/core';
import { BaseComponent } from '../../core/components/base-component.directive';
import { Role } from '../models/dto/role.model';
import { distinctUntilChanged, Observable } from 'rxjs';
import { filterRole } from '../../core/tools/filter-role';
import { UserRole } from '../models/dto/user-role.model';
import { SessionService } from '../services/session.service';

@Directive()
export abstract class RoleComponent extends BaseComponent {
  protected constructor(protected readonly sessionService: SessionService,
                        changeDetector: ChangeDetectorRef) {
    super(changeDetector);
  }

  abstract get role(): Role;

  get userRoleSource(): Observable<UserRole> {
    return this.sessionService.getContextRole()
      .pipe(filterRole(this.role), distinctUntilChanged());
  }
}
