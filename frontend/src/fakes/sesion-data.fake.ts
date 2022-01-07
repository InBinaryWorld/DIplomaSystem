import { Role } from "../app/core/models/role.model";
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

const allRolesUserSession: SessionData = {
  id: '1',
  username: 'johnny',
  firstName: 'Jack',
  lastName: 'Daniels',
  token: 'XyZ',
  roles: [
    { id: '244001', role: Role.STUDENT },
    { id: '244901', role: Role.STUDENT },
    { id: '2', role: Role.ADMIN },
    { id: '14', role: Role.DEAN },
    { id: '162', role: Role.COORDINATOR },
    { id: '5007', role: Role.LECTURER },
    { id: '1072', role: Role.DIPLOMA_SECTION_MEMBER },
    { id: '759', role: Role.PROGRAM_COMMITTEE_MEMBER }
  ]
};

export const FakeSessionData = {
  studentSession,
  studentAdminSession: allRolesUserSession
};
