import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { Role } from '../../base/models/dto/role.model';
import { Injectable } from '@angular/core';
import { isNil } from 'lodash-es';
import { ContextRoutingService } from '../services/context-routing.service';
import { SessionStoreService } from '../../base/services/session-store.service';

@Injectable({
  providedIn: 'root'
})
export class LoginPageGuard implements CanActivate {

  protected constructor(private readonly sessionStoreService: SessionStoreService,
                        private readonly contextRoutingService: ContextRoutingService) {
  }

  get requiredRole(): Role {
    return Role.STUDENT;
  };

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.sessionStoreService.getContextRole().pipe(
      first(), map(userRole => isNil(userRole) ? true : this.redirectWithContext()
      )
    );
  }

  private redirectWithContext(): boolean {
    this.contextRoutingService.navigateToPageByContext();
    return false;
  }

}
