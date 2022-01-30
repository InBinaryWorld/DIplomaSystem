import { ChangeDetectorRef, Injectable } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { Role } from '../../base/models/dto/role.model';
import { Dictionary } from '../models/dictionary.model';
import { CleanableService } from './cleanable.service';
import { Cleanable } from '../components/cleanable.directive';
import { SessionStoreService } from '../../base/services/store/session-store.service';
import { combineLatest, distinctUntilChanged, filter, Observable, skip } from 'rxjs';
import { isNil } from 'lodash-es';
import { filterExists } from '../tools/filter-exists';
import { first, map } from 'rxjs/operators';
import { firstItem } from '../tools/first-item';
import { UserStoreService } from '../../base/services/store/user-store.service';
import { UserRole } from '../../base/models/dto/user-role.model';


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
              private readonly userStoreService: UserStoreService,
              private readonly router: Router) {
  }

  private getRouterEvents(): Observable<RouterEvent> {
    return this.router.events.pipe(filter(e => e instanceof RouterEvent)) as Observable<RouterEvent>;
  }

  init(cleanable: Cleanable, changeDetector: ChangeDetectorRef): void {
    const contextRole = this.sessionStoreService.getContextRole().pipe(skip(1));
    cleanable.addSubscription(
      combineLatest([contextRole, this.getRouterEvents()])
        .pipe(distinctUntilChanged(([role1], [role2]) => role1?.role === role2?.role))
        .subscribe(([role, event]) => {
          const contextPath = (role && this.routeByRole[role.role]) || this.loginRoute;
          if (isNil(event) || !event!.url.startsWith(contextPath)) {
            this.router.navigate([contextPath]).then();
          }
        })
    );
  }

  calculateNewUserRole(): Observable<UserRole | undefined> {
    return this.userStoreService.getUserRoles()
      .pipe(filterExists(), first(), map(roles => firstItem(roles)));
  }

}
