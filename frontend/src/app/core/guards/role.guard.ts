import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { Role } from '../../base/models/dto/role.model';
import { Injectable } from '@angular/core';
import { UserRole } from '../../base/models/dto/user-role.model';
import { isEmpty, isNil } from 'lodash-es';
import { SessionStoreService } from '../../base/services/session-store.service';
import { isNotNil } from '../tools/is-not-nil';
import { ContextRoutingService } from '../services/context-routing.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivateChild, CanActivate {

  protected constructor(private readonly router: Router,
                        private readonly activatedRoute: ActivatedRoute,
                        private readonly sessionStoreService: SessionStoreService,
                        private readonly contextRoutingService: ContextRoutingService) {
  }

  get requiredRole(): Role {
    return Role.STUDENT;
  };

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const routeAllowedRoles = route.data['allowedRoles'];
    return this.check(routeAllowedRoles && [routeAllowedRoles]);
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const allowedRolesPath: Role[][] = childRoute.pathFromRoot.reduce((roles: Role[][], state) => {
      const stateAllowedRoles: Role[] = state.data['allowedRoles'];
      if (isNotNil(stateAllowedRoles)) {
        roles.push(stateAllowedRoles);
      }
      return roles;
    }, []);
    return this.check(allowedRolesPath);
  }

  private check(pathAllowedRoles: Role[][]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.sessionStoreService.getContextRole().pipe(
      first(), map(userRole => this.testRoles(userRole, pathAllowedRoles) ? true : this.redirectToGuardPage()
      )
    );
  }

  private testRoles(userRole?: UserRole, pathAllowedRoles?: Role[][]): boolean {
    if (isEmpty(pathAllowedRoles)) {
      return true;
    }
    if (isNil(userRole)) {
      return false;
    }
    return pathAllowedRoles!.every(allowedRoles => allowedRoles.includes(userRole.role));
  }

  private redirectToGuardPage(): boolean {
    this.contextRoutingService.navigateToPageByContext();
    return false;
  }

}
