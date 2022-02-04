import { Role } from '../app/base/models/dto/role.model';
import { AuthData } from '../app/base/models/auth-data.model';
import { User } from '../app/base/models/dto/user-ext.model';
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
import { Employee } from '../app/base/models/dto/employee.model';
import { EmployeeRole } from '../app/base/models/dto/employee-role.model';
import { IdType } from '../app/base/models/dto/id.model';
import { UserPerson } from '../app/base/models/dto/user-person.model';
import { FieldOfStudy } from '../app/base/models/dto/field-of-study.model';
import { StudyDegree } from '../app/base/models/dto/study-degree.model';
import { Student } from '../app/base/models/dto/student.model';
import { ReservationMember } from '../app/base/models/dto/reservation-member.model';
import { ReservationMemberStatus } from '../app/base/models/dto/reservation-member-status.model';

const userId: IdType = '1';

const adminId: IdType = '2';
const deanId: IdType = '63';
const studentId: IdType = '1482';
const lecturerId: IdType = '1';
const coordinatorId: IdType = '185';
const diplomaSectionMemberId: IdType = '140';
const programCommitteeMemberId: IdType = '176';

const thesisId: IdType = '7';
const reservationId: IdType = '32';
const reservationMemberId: IdType = '75';

const timetableId: IdType = '14';
const departmentId: IdType = '4';
const fieldOfStudyId: IdType = '2';
const diplomaSessionId: IdType = '14';

const changeRequestId: IdType = '116';
const clarificationRequestId: IdType = '583';


const deadline = new Date(2023, 1);

const userPerson: UserPerson = {
  id: userId,
  firstName: 'Jack',
  lastName: 'Daniels'
};

const user: User = {
  ...userPerson,
  roles: [
    { id: studentId, role: Role.STUDENT },
    { id: adminId, role: Role.ADMIN },
    { id: deanId, role: Role.DEAN },
    { id: coordinatorId, role: Role.COORDINATOR },
    { id: lecturerId, role: Role.LECTURER },
    { id: diplomaSectionMemberId, role: Role.DIPLOMA_SECTION_MEMBER },
    { id: programCommitteeMemberId, role: Role.PROGRAM_COMMITTEE_MEMBER }
  ]
};

// Is also supervisor supervisors
const lecturer: Employee = {
  id: lecturerId,
  userId: userId,
  departmentId: departmentId,
  employeeRole: EmployeeRole.LECTURER,
  title: 'Prof.',
  user: userPerson
};


const thesis: Thesis = {
  id: thesisId,
  supervisorId: lecturerId,
  diplomaSessionId: diplomaSessionId,
  topic: 'Predykcja zachowań ludzi podczas lockdownu',
  description: 'Predykcja zachowań ludzi podczas lockdownu Predykcja zachowań ludzi podczas lockdownu Predykcja zachowań ludzi podczas lockdownu',
  numberOfStudents: 3,
  status: ThesisStatus.APPROVED_BY_COORDINATOR,
  reportedByStudent: false,
  submissionDate: new Date(),
  supervisor: lecturer
};

const fieldOfStudy: FieldOfStudy = {
  id: fieldOfStudyId,
  departmentId: departmentId,
  activeDiplomaSessionId: diplomaSessionId,
  degree: StudyDegree.MASTERS,
  name: 'Informatyka Stosowana'
};

const student: Student = {
  id: studentId,
  userId: userId,
  fieldOfStudyId: fieldOfStudyId,
  indexNumber: '249013',
  fieldOfStudy: fieldOfStudy,
  user: userPerson
};

const reservationMember: ReservationMember = {
  id: reservationMemberId,
  student: student,
  reservationId: reservationId,
  studentId: studentId,
  status: ReservationMemberStatus.WILLING
};

const reservation: Reservation = {
  id: reservationId,
  creationDate: new Date(),
  status: ReservationStatus.ACCEPTED,
  thesisId: thesisId,
  thesis: thesis,
  reservationMembers: [
    reservationMember,
    reservationMember
  ]
};

const clarificationRequest: ClarificationRequest = {
  id: clarificationRequestId,
  studentId: studentId,
  thesisId: thesisId,
  employeeId: deanId,
  submissionDate: new Date(),
  status: RequestStatus.WAITING,
  newTopic: 'nowy temat pracy',
  newDescription: 'nowy opis pracy',
  supervisor: lecturer,
  baseThesis: thesis
};

const changeRequest: ChangeRequest = {
  id: changeRequestId,
  studentId: studentId,
  employeeId: programCommitteeMemberId,
  submissionDate: new Date(),
  status: RequestStatus.WAITING,
  newThesisId: thesisId,
  oldThesisId: thesisId,
  supervisor: lecturer,
  newThesis: thesis,
  previousThesis: thesis
};


const timetable: Timetable = {
  id: timetableId,
  diplomaSessionId: diplomaSessionId,
  selectingThesis: deadline,
  submittingThesis: deadline,
  changingThesis: deadline,
  clarificationThesis: deadline,
  approvingThesisByCommittee: deadline,
  approvingThesisByCoordinator: deadline
};

const diplomaSession: DiplomaSession = {
  id: diplomaSessionId,
  timetableId: timetableId,
  fieldOfStudyId: fieldOfStudyId,
  year: '2022/2023',
  fieldOfStudy: fieldOfStudy
};


const lecturers: Employee[] = [
  lecturer,
  lecturer,
  lecturer,
  lecturer,
  lecturer,
  lecturer,
  lecturer
];

const students: Student[] = [
  student,
  student,
  student,
  student,
  student,
  student
];

const theses: Thesis[] = [
  thesis,
  thesis,
  thesis,
  thesis,
  thesis,
  thesis,
  thesis
];

const reservations: Reservation[] = [
  reservation,
  reservation,
  reservation,
  reservation,
  reservation,
  reservation,
  reservation,
  reservation,
  reservation
];

const clarificationRequests: ClarificationRequest[] = [
  clarificationRequest,
  clarificationRequest,
  clarificationRequest,
  clarificationRequest,
  clarificationRequest,
  clarificationRequest,
  clarificationRequest,
  clarificationRequest,
  clarificationRequest,
  clarificationRequest
];

const changeRequests: ChangeRequest[] = [
  changeRequest,
  changeRequest,
  changeRequest,
  changeRequest,
  changeRequest,
  changeRequest,
  changeRequest,
  changeRequest,
  changeRequest,
  changeRequest
];


const responseByApiKey: Dictionary<any> = {
  [ApiLabel.CONFIRM_MEMBER_RESERVATION]: reservationMember,
  [ApiLabel.CONFIRM_PARTICIPATION_IN_RESERVATION]: reservationMember,
  [ApiLabel.CREATE_CLARIFICATION_REQUEST]: clarificationRequest,
  [ApiLabel.CREATE_CHANGE_REQUEST]: changeRequest,
  [ApiLabel.CREATE_THESIS]: thesis,
  [ApiLabel.CREATE_RESERVATION]: reservation,
  [ApiLabel.GET_USER]: user,
  [ApiLabel.GET_CHANGE_REQUEST]: changeRequest,
  [ApiLabel.GET_CHANGE_REQUESTS]: changeRequests,
  [ApiLabel.GET_CLARIFICATION_REQUEST]: clarificationRequest,
  [ApiLabel.GET_CLARIFICATION_REQUESTS]: clarificationRequests,
  [ApiLabel.GET_DIPLOMA_SESSION]: diplomaSession,
  [ApiLabel.GET_EMPLOYEES]: lecturers,
  [ApiLabel.GET_RESERVATION]: reservation,
  [ApiLabel.GET_RESERVATIONS]: reservations,
  [ApiLabel.GET_STUDENT]: student,
  [ApiLabel.GET_STUDENTS]: students,
  [ApiLabel.GET_TIMETABLE]: timetable,
  [ApiLabel.GET_THESIS]: thesis,
  [ApiLabel.GET_THESES]: theses
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

export const FakeData = {
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
  timetable,
  supervisors: lecturers,
  diplomaSession
};
