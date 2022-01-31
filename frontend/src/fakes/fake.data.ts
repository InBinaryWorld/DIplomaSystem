import { Role } from '../app/base/models/dto/role.model';
import { AuthData } from '../app/base/models/auth-data.model';
import { User } from '../app/base/models/dto/user.model';
import { ApiLabel } from '../app/core/models/api-route.model';
import { Dictionary } from '../app/core/models/dictionary.model';
import { Thesis } from '../app/base/models/dto/thesis.model';
import { ThesisStatus } from '../app/base/models/dto/topic-status.model';
import { Reservation } from '../app/base/models/dto/reservation.model';
import { ReservationStatus } from '../app/base/models/dto/reservation-status.model';
import { ClarificationRequest } from '../app/base/models/dto/clarification-request.model';
import { RequestStatus } from '../app/base/models/dto/request-status.model';
import { ChangeRequest } from '../app/base/models/dto/change-request.model';
import { Timetable } from '../app/base/models/dto/timetable.model';
import { isNil } from 'lodash-es';
import { DiplomaSession } from '../app/base/models/dto/diploma-session.model';

const user: User = {
  id: '1',
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

const thesis: Thesis = {
  id: '12',
  supervisorId: '1',
  diplomaSessionId: '10',
  topic: 'Predykcja zachowań ludzi podczas lockdownu',
  description: 'Predykcja zachowań ludzi podczas lockdownu Predykcja zachowań ludzi podczas lockdownu Predykcja zachowań ludzi podczas lockdownu',
  numberOfStudents: 1,
  status: ThesisStatus.APPROVED_BY_COMMITTEE,
  reportedByStudent: false,
  submissionDate: new Date()
};

const reservation: Reservation = {
  id: '1',
  creationDate: new Date(),
  status: ReservationStatus.CONFIRMED,
  thesisId: '12'
};

const clarificationRequest: ClarificationRequest = {
  id: '1',
  studentId: '244001',
  thesisId: '12',
  employeeId: '4',
  submissionDate: new Date(),
  newTopic: 'nowy temat pracy',
  newDescription: 'nowy opis pracy',
  status: RequestStatus.WAITING
};

const changeRequest: ChangeRequest = {
  id: '1',
  studentId: '244001',
  employeeId: '4',
  submissionDate: new Date(),
  status: RequestStatus.WAITING,
  newThesisId: '12',
  oldThesisId: '12'
};

const timetable: Timetable = {
  id: '10',
  diplomaSessionId: '10',
  changingThesis: new Date(),
  selectingThesis: new Date(),
  submittingThesis: new Date(),
  clarificationThesis: new Date(2023, 1),
  approvingThesisByCommittee: new Date(),
  approvingThesisByCoordinator: new Date()
};

const diplomaSession: DiplomaSession = {
  id: '10',
  timetableId: '10',
  fieldOfStudyId: '6',
  year: '2022/2023'
};

const reservations = [
  reservation,
  reservation,
  reservation,
  reservation,
  reservation
];

const clarificationRequests = [
  clarificationRequest,
  clarificationRequest,
  clarificationRequest,
  clarificationRequest,
  clarificationRequest
];

const changeRequests = [
  changeRequest,
  changeRequest,
  changeRequest,
  changeRequest,
  changeRequest,
  changeRequest,
  changeRequest
];


const responseByApiKey: Dictionary<any> = {
  [ApiLabel.CREATE_CLARIFICATION_REQUEST]: clarificationRequest,
  [ApiLabel.GET_USER]: user,
  [ApiLabel.GET_CHANGE_REQUEST]: changeRequest,
  [ApiLabel.GET_CHANGE_REQUESTS]: changeRequests,
  [ApiLabel.GET_CLARIFICATION_REQUEST]: clarificationRequest,
  [ApiLabel.GET_CLARIFICATION_REQUESTS]: clarificationRequests,
  [ApiLabel.GET_DIPLOMA_SESSION]: diplomaSession,
  [ApiLabel.GET_RESERVATIONS]: reservations,
  [ApiLabel.GET_TIMETABLE]: timetable,
  [ApiLabel.GET_THESIS]: thesis
};

function generateAuthData(): AuthData {
  return {
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
    expireIn: new Date().getTime() + 5 * 1000 // 5 min
  };
}

function handleLabel(apiLabel: ApiLabel): NonNullable<any> {
  switch (apiLabel) {
    case ApiLabel.LOGIN:
    case ApiLabel.REFRESH:
      return generateAuthData();
    default:
      return responseByApiKey[apiLabel];
  }
}

export const FakeSessionData = {
  handleApiLabel(apiLabel: ApiLabel): NonNullable<any> {
    const response = handleLabel(apiLabel);
    if (isNil(response)) {
      throw new Error('FAKES: Unhandled Api Label: ' + apiLabel);
    }
    return response;
  },
  thesis,
  reservation,
  changeRequest,
  clarificationRequest,
  timetable

};
