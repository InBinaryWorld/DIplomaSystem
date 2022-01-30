import { Role } from '../app/base/models/dto/role.model';
import { AuthData } from '../app/base/models/auth-data.model';
import { User } from '../app/base/models/dto/user.model';
import { ApiLabel } from '../app/core/models/api-route.model';
import { Dictionary } from '../app/core/models/dictionary.model';
import { Thesis } from '../app/base/models/dto/thesis-topic.model';
import { TopicStatus } from '../app/base/models/dto/topic-status.model';
import { Reservation } from '../app/base/models/dto/reservation.model';
import { ReservationStatus } from '../app/base/models/dto/reservation-status.model';
import { ClarificationRequest } from '../app/base/models/dto/clarification-request.model';
import { RequestStatus } from '../app/base/models/dto/request-state.model';
import { ChangeRequest } from '../app/base/models/dto/change-request.model';
import { Timetable } from '../app/base/models/dto/timetable.model';

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

const topic: Thesis = {
  id: '10',
  supervisorId: '1',
  diplomaSessionId: '12',
  topic: 'Predykcja zachowań ludzi podczas lockdownu',
  description: 'Predykcja zachowań ludzi podczas lockdownu Predykcja zachowań ludzi podczas lockdownu Predykcja zachowań ludzi podczas lockdownu',
  numberOfStudents: 1,
  status: TopicStatus.APPROVED_BY_COORDINATOR,
  reportedByStudent: false,
  submissionDate: new Date()
};

const reservation: Reservation = {
  id: '1',
  creationDate: new Date(),
  status: ReservationStatus.CONFIRMED,
  topicId: '12'
};

const clarificationRequest: ClarificationRequest = {
  id: '1',
  studentId: '2',
  thesisId: '3',
  employeeId: '4',
  submissionDate: new Date(),
  newTopic: 'nowy temat pracy',
  newDescription: 'nowy opis pracy',
  status: RequestStatus.WAITING
};

const changeRequest: ChangeRequest = {
  id: '1',
  studentId: '2',
  employeeId: '4',
  submissionDate: new Date(),
  status: RequestStatus.WAITING,
  newThesisId: '5',
  oldThesisId: '2'
};

const timetable: Timetable = {
  id: '1',
  diplomaSessionId: '1',
  changingTopics: new Date(),
  selectingTopics: new Date(),
  submittingTopics: new Date(),
  certificatingTopics: new Date(),
  approvingTopicsByCommittee: new Date(),
  approvingTopicsByCoordinator: new Date()
};

const clarificationRequestApi = [
  clarificationRequest,
  clarificationRequest,
  clarificationRequest,
  clarificationRequest,
  clarificationRequest
];

const changeRequestApi = [
  changeRequest,
  changeRequest,
  changeRequest,
  changeRequest,
  changeRequest,
  changeRequest,
  changeRequest
];


const responseByApiKey: Dictionary<any> = {
  [ApiLabel.USER]: user,
  [ApiLabel.CHANGE_REQUESTS]: changeRequestApi,
  [ApiLabel.CLARIFICATION_REQUESTS]: clarificationRequestApi
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
  },
  topic,
  reservation,
  changeRequest,
  clarificationRequest,
  timetable

};
