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
      [ApiLabel.GET_CHANGE_REQUESTS]: 'TODO',
      [ApiLabel.GET_CLARIFICATION_REQUESTS]: 'TODO',
      [ApiLabel.GET_DEPARTMENTS]: 'TODO',
      [ApiLabel.GET_DIPLOMA_SESSIONS]: 'TODO',
      [ApiLabel.GET_FIELDS_OF_STUDY]: 'TODO',
      [ApiLabel.GET_RESERVATIONS]: 'TODO',
      [ApiLabel.GET_RESERVATIONS_MEMBERS]: 'TODO',
      [ApiLabel.GET_TIMETABLES]: 'TODO',
      [ApiLabel.GET_USER]: 'TODO',
      [ApiLabel.REJECT_CLARIFICATION_REQUESTS]: 'TODO',

    }
  }
};
