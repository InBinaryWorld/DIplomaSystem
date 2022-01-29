import { ApiLabel } from '../app/core/models/api-route.model';
import { AppLanguage } from '../app/core/models/app-language.model';

export const baseEnvironment = {
  fakeApi: {
    enabled: true,
    delayTime: 1000
  },
  defaultLanguage: AppLanguage.POLISH,
  serverConfig: {
    baseUrl: 'http://localhost:8082',
    api: {
      [ApiLabel.LOGIN]: 'TODO',
      [ApiLabel.REFRESH]: 'TODO',
      [ApiLabel.USER]: 'TODO'
    }
  }
};
