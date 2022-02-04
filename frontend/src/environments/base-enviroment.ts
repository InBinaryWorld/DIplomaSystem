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
      [ApiLabel.REFRESH]: 'TODO',
      [ApiLabel.ABANDON_MEMBER_RESERVATION]: 'TODO',
      [ApiLabel.APPROVE_CLARIFICATION_REQUEST]: 'TODO',
      [ApiLabel.APPROVE_THESIS_WITH_COORDINATOR]: 'TODO',
      [ApiLabel.CONFIRM_MEMBER_RESERVATION]: 'TODO',
      [ApiLabel.CONFIRM_PARTICIPATION_IN_RESERVATION]: 'TODO',
      [ApiLabel.CREATE_CLARIFICATION_REQUEST]: 'TODO',
      [ApiLabel.CREATE_CHANGE_REQUEST]: 'TODO',
      [ApiLabel.CREATE_THESIS]: 'TODO',
      [ApiLabel.CREATE_RESERVATION]: 'TODO',
      [ApiLabel.GET_CHANGE_REQUEST]: 'TODO',
      [ApiLabel.GET_CHANGE_REQUESTS]: 'TODO',
      [ApiLabel.GET_CLARIFICATION_REQUEST]: 'TODO',
      [ApiLabel.GET_CLARIFICATION_REQUESTS]: 'TODO',
      [ApiLabel.GET_DEPARTMENT]: 'TODO',
      [ApiLabel.GET_DEPARTMENTS]: 'TODO',
      [ApiLabel.GET_DIPLOMA_SESSION]: 'TODO',
      [ApiLabel.GET_DIPLOMA_SESSIONS]: 'TODO',
      [ApiLabel.GET_EMPLOYEE]: 'TODO',
      [ApiLabel.GET_EMPLOYEES]: 'TODO',
      [ApiLabel.GET_FIELD_OF_STUDY]: 'TODO',
      [ApiLabel.GET_FIELDS_OF_STUDY]: 'TODO',
      [ApiLabel.GET_RESERVATION]: 'TODO',
      [ApiLabel.GET_RESERVATIONS]: 'TODO',
      [ApiLabel.GET_RESERVATION_MEMBERS]: 'TODO',
      [ApiLabel.GET_STUDENT]: 'TODO',
      [ApiLabel.GET_STUDENTS]: 'TODO',
      [ApiLabel.GET_THESES]: 'TODO',
      [ApiLabel.GET_THESIS]: 'TODO',
      [ApiLabel.GET_TIMETABLE]: 'TODO',
      [ApiLabel.GET_TIMETABLES]: 'TODO',
      [ApiLabel.GET_USER]: 'TODO',
      [ApiLabel.REJECT_CLARIFICATION_REQUEST]: 'TODO',
      [ApiLabel.REJECT_THESIS_WITH_COORDINATOR]: 'TODO',
      [ApiLabel.REQUEST_THESIS_CORRECTIONS]: 'TODO'
    }
  }
};
