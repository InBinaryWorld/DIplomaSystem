import { ApiLabel } from '../app/core/models/api-route.model';
import { AppLanguage } from '../app/core/models/app-language.model';

export const baseEnvironment = {
  fakeApi: {
    enabled: false,
    delayTime: 1000
  },
  defaultLanguage: AppLanguage.POLISH,
  serverConfig: {
    authBase: '/auth',
    base: '/api',
    api: {
      [ApiLabel.LOGIN]: '/oauth/token',
      [ApiLabel.REFRESH]: 'TODO REFRESH',
      [ApiLabel.MODIFY_TIMETABLE]: 'TODO MODIFY_TIMETABLE',
      [ApiLabel.ACCEPT_THESIS_WITH_LECTURER]: 'TODO ACCEPT_THESIS_WITH_LECTURER',
      [ApiLabel.CORRECT_THESIS_WITH_LECTURER]: 'TODO CORRECT_THESIS_WITH_LECTURER',
      [ApiLabel.REJECT_THESIS_WITH_LECTURER]: 'TODO REJECT_THESIS_WITH_LECTURER',
      [ApiLabel.ABANDON_MEMBER_RESERVATION]: '/student/reservation/cancel', // request param "studentId", "reservationId"
      [ApiLabel.APPROVE_CLARIFICATION_REQUEST]: 'TODO APPROVE_CLARIFICATION_REQUEST',
      [ApiLabel.APPROVE_CHANGE_REQUEST]: 'TODO APPROVE_CHANGE_REQUEST',
      [ApiLabel.APPROVE_THESIS_WITH_COORDINATOR]: 'TODO APPROVE_THESIS_WITH_COORDINATOR',
      [ApiLabel.APPROVE_THESIS_WITH_COMMITTEE_MEMBER]: 'TODO APPROVE_THESIS_WITH_COMMITTEE_MEMBER',
      [ApiLabel.CONFIRM_MEMBER_RESERVATION]: '/student/reservation/approve', // request param "studentId", "reservationId"
      [ApiLabel.CONFIRM_PARTICIPATION_IN_RESERVATION]: '/student/reservation/approve', // request param "studentId", "reservationId"
      [ApiLabel.CREATE_CLARIFICATION_REQUEST]: 'TODO CREATE_CLARIFICATION_REQUEST',
      [ApiLabel.CREATE_CHANGE_REQUEST]: 'TODO CREATE_CHANGE_REQUEST',
      [ApiLabel.CREATE_THESIS]: 'TODO CREATE_THESIS',
      [ApiLabel.CREATE_RESERVATION]: '/student/reservation', // request param: "studentId"; body: { thesisId: number, studentIds: number[] }
      [ApiLabel.REJECT_RESERVATION]: '/lecturer/reservation/reject', // request param: "id" (id rezerwacji)
      [ApiLabel.ACCEPT_RESERVATION]: '/lecturer/reservation/reject', // request param: "id" (id rezerwacji)
      [ApiLabel.GET_CHANGE_REQUEST]: 'TODO GET_CHANGE_REQUEST',
      [ApiLabel.GET_CHANGE_REQUESTS]: 'TODO GET_CHANGE_REQUESTS',
      [ApiLabel.GET_CLARIFICATION_REQUEST]: 'TODO GET_CLARIFICATION_REQUEST',
      [ApiLabel.GET_CLARIFICATION_REQUESTS]: 'TODO GET_CLARIFICATION_REQUESTS',
      [ApiLabel.GET_DEPARTMENT]: 'TODO GET_DEPARTMENT',
      [ApiLabel.GET_DEPARTMENTS]: 'TODO GET_DEPARTMENTS',
      [ApiLabel.GET_DIPLOMA_SESSION]: 'TODO GET_DIPLOMA_SESSION',
      [ApiLabel.GET_DIPLOMA_SESSIONS]: 'TODO GET_DIPLOMA_SESSIONS',
      [ApiLabel.GET_EMPLOYEE]: '/employee',
      [ApiLabel.GET_EMPLOYEES]: '/employee',
      [ApiLabel.GET_FIELD_OF_STUDY]: 'TODO GET_FIELD_OF_STUDY',
      [ApiLabel.GET_FIELDS_OF_STUDY]: 'TODO GET_FIELDS_OF_STUDY',
      [ApiLabel.GET_RESERVATION]: '/student/reservation',
      [ApiLabel.GET_RESERVATIONS]: '/student/reservation',
      [ApiLabel.GET_RESERVATION_MEMBERS]: 'TODO GET_RESERVATION_MEMBERS',
      [ApiLabel.GET_STUDENT]: '/student',
      [ApiLabel.GET_STUDENTS]: '/student',
      [ApiLabel.GET_THESES]: '/subject',
      [ApiLabel.GET_THESIS]: '/subject',
      [ApiLabel.GET_TIMETABLE]: '/schedule',
      [ApiLabel.GET_TIMETABLES]: '/schedule',
      [ApiLabel.GET_USER]: '/user',
      [ApiLabel.REJECT_CLARIFICATION_REQUEST]: '/dean/request/correction/reject',
      [ApiLabel.REJECT_CHANGE_REQUEST]: '/commission/request/change/reject',
      [ApiLabel.REJECT_THESIS_WITH_COORDINATOR]: '/coordinator/subject/reject',
      [ApiLabel.REJECT_THESIS_WITH_COMMITTEE_MEMBER]: '/commission/subject/reject',
      [ApiLabel.REQUEST_THESIS_CORRECTIONS]: '/coordinator/subject/comment'
    }
  }
};
