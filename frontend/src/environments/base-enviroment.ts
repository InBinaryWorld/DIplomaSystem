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
      [ApiLabel.APPROVE_CLARIFICATION_REQUEST]: '/dean/request/correction/accept',
      [ApiLabel.APPROVE_CHANGE_REQUEST]: '/commission/request/change/accept',
      [ApiLabel.APPROVE_THESIS_WITH_COORDINATOR]: '/coordinator/subject/accept', // request param "id" (id tematu)
      [ApiLabel.APPROVE_THESIS_WITH_COMMITTEE_MEMBER]: '/commission/subject/accept', // request param "id" (id tematu)
      [ApiLabel.CONFIRM_MEMBER_RESERVATION]: '/student/reservation/approve', // request param "studentId", "reservationId"
      [ApiLabel.CONFIRM_PARTICIPATION_IN_RESERVATION]: '/student/reservation/approve', // request param "studentId", "reservationId"
      [ApiLabel.CREATE_CLARIFICATION_REQUEST]: '/student/request/topic-correction', // body: { topicId: number, studentId: number, newTopic: string, newDescription: string}
      [ApiLabel.CREATE_CHANGE_REQUEST]: '/student/request/topic-change', // body takie jak jest ok, tylko trzeba dodać pole previousThesisId: number; poza tym zakładam że albo thesisId albo newThesis (jedno z dwóch) będzie nullem - w zależności od tego czy temat istnieje czy nie
      [ApiLabel.CREATE_THESIS]: 'TODO CREATE_THESIS',
      [ApiLabel.CREATE_RESERVATION]: '/student/reservation', // request param: "studentId"; body: { thesisId: number, studentIds: number[] }
      [ApiLabel.REJECT_RESERVATION]: '/lecturer/reservation/reject', // request param: "id" (id rezerwacji)
      [ApiLabel.ACCEPT_RESERVATION]: '/lecturer/reservation/reject', // request param: "id" (id rezerwacji)
      [ApiLabel.GET_CHANGE_REQUEST]: '/request/change',
      [ApiLabel.GET_CHANGE_REQUESTS]: '/request/change',
      [ApiLabel.GET_CLARIFICATION_REQUEST]: '/request/clarification',
      [ApiLabel.GET_CLARIFICATION_REQUESTS]: '/request/clarification',
      [ApiLabel.GET_DEPARTMENT]: '/general/department',
      [ApiLabel.GET_DEPARTMENTS]: '/general/department',
      [ApiLabel.GET_DIPLOMA_SESSION]: '/general/diploma-session',
      [ApiLabel.GET_DIPLOMA_SESSIONS]: '/general/diploma-session',
      [ApiLabel.GET_EMPLOYEE]: '/employee',
      [ApiLabel.GET_EMPLOYEES]: '/employee',
      [ApiLabel.GET_FIELD_OF_STUDY]: '/general/field-of-study',
      [ApiLabel.GET_FIELDS_OF_STUDY]: '/general/field-of-study',
      [ApiLabel.GET_RESERVATION]: '/student/reservation',
      [ApiLabel.GET_RESERVATIONS]: '/student/reservation',
      [ApiLabel.GET_STUDENT]: '/student',
      [ApiLabel.GET_STUDENTS]: '/student',
      [ApiLabel.GET_THESES]: '/subject',
      [ApiLabel.GET_THESIS]: '/subject',
      [ApiLabel.GET_TIMETABLE]: '/general/schedule',
      [ApiLabel.GET_TIMETABLES]: '/general/schedule',
      [ApiLabel.GET_USER]: '/user',
      [ApiLabel.REJECT_CLARIFICATION_REQUEST]: '/dean/request/correction/reject',
      [ApiLabel.REJECT_CHANGE_REQUEST]: '/commission/request/change/reject',
      [ApiLabel.REJECT_THESIS_WITH_COORDINATOR]: '/coordinator/subject/reject',
      [ApiLabel.REJECT_THESIS_WITH_COMMITTEE_MEMBER]: '/commission/subject/reject',
      [ApiLabel.REQUEST_THESIS_CORRECTIONS]: '/coordinator/subject/comment'
    }
  }
};
