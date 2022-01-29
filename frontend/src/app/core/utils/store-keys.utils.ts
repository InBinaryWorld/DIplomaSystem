import { Role } from '../../base/models/dto/role.model';

export class StoreKeys {

  public static forUserRole(role: Role, roleId: string): string {
    return role + '_' + roleId;
  }

}
