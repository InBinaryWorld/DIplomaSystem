import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { SessionStoreService } from "../../modules/login/services/session-store.service";
import { Role } from "../models/user-role.model";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export abstract class RoleGuard implements CanActivateChild, CanActivate {

  protected constructor(private readonly router: Router,
                        private readonly sessionStoreService: SessionStoreService) {
  }

  abstract get requiredRole(): Role;

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.check();
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.check();
  }

  private check(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.sessionStoreService.getContextRole()
      .pipe(first(), map(role => role?.role === this.requiredRole ? true : this.redirectToGuardPage()));
  }

  private redirectToGuardPage(): boolean {
    this.router.navigate(['/login']).then();
    return false;
  }

}
