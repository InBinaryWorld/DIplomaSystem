import { ChangeDetectorRef, Directive } from '@angular/core';
import { SessionStoreService } from '../services/session-store.service';
import { BaseComponent } from '../../core/components/base-component.directive';
import { Role } from '../models/dto/role.model';
import { distinctUntilChanged, Observable } from 'rxjs';
import { filterRole } from '../../core/tools/filter-role';
import { UserRole } from '../models/dto/user-role.model';

@Directive()
export abstract class RoleComponent extends BaseComponent {
  protected constructor(private readonly sessionStoreService: SessionStoreService,
                        changeDetector: ChangeDetectorRef) {
    super(changeDetector);
  }

  abstract get role(): Role;

  get userRole(): Observable<UserRole> {
    return this.sessionStoreService.getContextRole()
      .pipe(filterRole(this.role), distinctUntilChanged());
  }
}
