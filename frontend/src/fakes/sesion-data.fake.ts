import { Role } from "../app/core/models/user-role.model";
import { SessionData } from "../app/modules/login/models/session-data.model";

const studentSession: SessionData = {
  id: '1',
  username: 'johnny',
  firstName: 'Jack',
  lastName: 'Daniels',
  token: 'XyZ',
  roles: [
    { id: '244001', role: Role.STUDENT }
  ]
};

const studentAdminSession: SessionData = {
  id: '1',
  username: 'johnny',
  firstName: 'Jack',
  lastName: 'Daniels',
  token: 'XyZ',
  roles: [
    { id: '244001', role: Role.STUDENT },
    { id: '3221', role: Role.ADMIN }
  ]
};

export const FakeSessionData = {
  studentSession,
  studentAdminSession
};
