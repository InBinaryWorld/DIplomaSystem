import { UserRole } from "./user-role.model";

export interface SessionData {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  roles: UserRole[];
  token: string;
}
