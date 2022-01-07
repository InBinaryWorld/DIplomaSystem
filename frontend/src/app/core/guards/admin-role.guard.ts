import { Injectable } from '@angular/core';
import { Role } from "../models/user-role.model";
import { RoleGuard } from "./role.guard";

@Injectable({
  providedIn: 'root'
})
export class AdminRoleGuard extends RoleGuard {

  get requiredRole(): Role {
    return Role.ADMIN;
  }

}
