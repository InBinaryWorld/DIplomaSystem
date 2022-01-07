import { Injectable } from '@angular/core';
import { SessionStoreService } from "../../modules/login/services/session-store.service";
import { first } from "rxjs/operators";
import { UserRole } from "../../modules/login/models/user-role.model";
import { Router } from "@angular/router";
import { isNotNil } from "../base/isNotNil";
import { Role } from "../models/user-role.model";


@Injectable({
  providedIn: 'root'
})
export class ContextRoutingService {

  constructor(private readonly sessionStoreService: SessionStoreService,
              private readonly router: Router) {
  }

  public navigateToPageByContext(): void {
    this.sessionStoreService.getContextRole()
      .pipe(first())
      .subscribe(role => this.handleRole(role))
  }

  private handleRole(role: UserRole | undefined): void {
    if (isNotNil(role)) {
      switch (role?.role) {
        case Role.ADMIN:
          this.router.navigate(['/admin']).then();
          return;
        case Role.STUDENT:
          this.router.navigate(['/student']).then();
          return;
      }
    }
    this.router.navigate(['/login']).then();
  }
}
