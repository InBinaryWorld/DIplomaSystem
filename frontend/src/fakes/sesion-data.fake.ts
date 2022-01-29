import { Role } from '../app/base/models/dto/role.model';
import { AuthData } from '../app/base/models/auth-data.model';
import { User } from '../app/base/models/dto/user.model';
import { ApiLabel } from '../app/core/models/api-route.model';
import { Dictionary } from '../app/core/models/dictionary.model';


const userAllRoles: User = {
  id: '1',
  username: 'johnny',
  firstName: 'Jack',
  lastName: 'Daniels',
  roles: [
    { id: '244001', role: Role.STUDENT },
    { id: '244902', role: Role.STUDENT },
    { id: '2', role: Role.ADMIN },
    { id: '14', role: Role.DEAN },
    { id: '162', role: Role.COORDINATOR },
    { id: '5007', role: Role.LECTURER },
    { id: '1072', role: Role.DIPLOMA_SECTION_MEMBER },
    { id: '759', role: Role.PROGRAM_COMMITTEE_MEMBER }
  ]
};

const responseByApiKey: Dictionary<any> = {
  [ApiLabel.USER]: userAllRoles
};

function generateAuthData(): AuthData {
  return {
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
    expireIn: new Date().getTime() + 5 * 1000 // 5 min
  };
}


export const FakeSessionData = {
  handleApiLabel(apiLabel: ApiLabel) {
    switch (apiLabel) {
      case ApiLabel.LOGIN:
      case ApiLabel.REFRESH:
        return generateAuthData();
      default:
        return responseByApiKey[apiLabel];
    }
  }
};
