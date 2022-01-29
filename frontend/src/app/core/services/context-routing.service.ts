import { ChangeDetectorRef, Injectable } from '@angular/core';
import { first } from 'rxjs/operators';
import { UserRole } from '../../base/models/dto/user-role.model';
import { Router } from '@angular/router';
import { Role } from '../../base/models/dto/role.model';
import { Dictionary } from '../models/dictionary.model';
import { CleanableService } from './cleanable.service';
import { Cleanable } from '../components/base/cleanable.directive';
import { distinctUntilChanged } from 'rxjs';
import { SessionStoreService } from '../../base/services/session-store.service';


@Injectable({
  providedIn: 'root'
})
export class ContextRoutingService implements CleanableService {

  private loginRoute = '/login';
  private routeByRole: Dictionary<string> = {
    [Role.DEAN]: '/dean',
    [Role.ADMIN]: '/admin',
    [Role.STUDENT]: '/student',
    [Role.LECTURER]: '/lecturer',
    [Role.COORDINATOR]: '/coordinator',
    [Role.DIPLOMA_SECTION_MEMBER]: '/diploma-section',
    [Role.PROGRAM_COMMITTEE_MEMBER]: '/program-committee'
  };

  constructor(private readonly sessionStoreService: SessionStoreService,
              private readonly router: Router) {
  }

  init(cleanable: Cleanable, changeDetector: ChangeDetectorRef): void {
    this.sessionStoreService.getContextRole()
      .pipe(distinctUntilChanged())
      .subscribe(role => this.handleRole(role));
  }

  public navigateToPageByContext(): void {
    this.sessionStoreService.getContextRole()
      .pipe(first())
      .subscribe(role => this.handleRole(role));
  }

  private handleRole(role?: UserRole): void {
    const path = this.getPathByRole(role);
    this.router.navigate([path]).then();
  }

  private getPathByRole(role?: UserRole): string {
    return (role && this.routeByRole[role.role]) ?? this.loginRoute;
  }
}
