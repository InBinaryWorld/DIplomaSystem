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
import { RequestParams } from '../app/core/models/request-param.model';
import { isNotNil } from '../app/core/tools/is-not-nil';

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


// additional
const student2Id: IdType = '1482';

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

const admin: Employee = {
  id: adminId,
  userId: userId,
  departmentId: departmentId,
  employeeRole: EmployeeRole.ADMIN,
  title: 'Admin',
  user: userPerson
};

// Is also supervisor supervisors
const lecturer: Employee = {
  id: lecturerId,
  userId: userId,
  departmentId: departmentId,
  employeeRole: EmployeeRole.LECTURER,
  title: 'Lecturer',
  user: userPerson
};

const dean: Employee = {
  id: deanId,
  userId: userId,
  departmentId: departmentId,
  employeeRole: EmployeeRole.DEAN,
  title: 'Dean',
  user: userPerson
};

const coordinator: Employee = {
  id: coordinatorId,
  userId: userId,
  departmentId: departmentId,
  employeeRole: EmployeeRole.COORDINATOR,
  title: 'Coordinator',
  user: userPerson
};

const committeeMember: Employee = {
  id: programCommitteeMemberId,
  userId: userId,
  departmentId: departmentId,
  employeeRole: EmployeeRole.PROGRAM_COMMITTEE_MEMBER,
  title: 'Committee member',
  user: userPerson
};

const diplomaSectionMember: Employee = {
  id: programCommitteeMemberId,
  userId: userId,
  departmentId: departmentId,
  employeeRole: EmployeeRole.DIPLOMA_SECTION_MEMBER,
  title: 'Diploma section member',
  user: userPerson
};

const thesis: Thesis = {
  id: thesisId,
  supervisorId: lecturerId,
  diplomaSessionId: diplomaSessionId,
  topic: 'Predykcja zachowań ludzi podczas lockdownu',
  description: 'Predykcja zachowań ludzi podczas lockdownu Predykcja zachowań ludzi podczas lockdownu Predykcja zachowań ludzi podczas lockdownu',
  numberOfStudents: 3,
  status: ThesisStatus.WAITING,
  reportedByStudent: false,
  submissionDate: new Date(),
  coordinatorComment: 'Całość do poprawy',
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

const student2: Student = {
  id: student2Id,
  userId: userId,
  fieldOfStudyId: fieldOfStudyId,
  indexNumber: '249041',
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
  baseThesis: thesis,
  student: student
};

const changeRequest: ChangeRequest = {
  id: changeRequestId,
  studentId: studentId,
  employeeId: programCommitteeMemberId,
  submissionDate: new Date(),
  status: RequestStatus.WAITING,
  newThesisId: thesisId,
  oldThesisId: thesisId,
  newThesis: thesis,
  previousThesis: thesis,
  student: student
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
  fieldOfStudy: fieldOfStudy,
  timetable: timetable
};

const students: Student[] = [
  student,
  student2
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

const employees = [
  dean,
  admin,
  coordinator,
  committeeMember,
  diplomaSectionMember
];


const responseByApiKey: Dictionary<any> = {
  [ApiLabel.ABANDON_MEMBER_RESERVATION]: reservationMember,
  [ApiLabel.APPROVE_CHANGE_REQUEST]: changeRequest,
  [ApiLabel.APPROVE_CLARIFICATION_REQUEST]: clarificationRequest,
  [ApiLabel.APPROVE_THESIS_WITH_COORDINATOR]: thesis,
  [ApiLabel.APPROVE_THESIS_WITH_COMMITTEE_MEMBER]: thesis,
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
  [ApiLabel.GET_FIELD_OF_STUDY]: fieldOfStudy,
  [ApiLabel.GET_RESERVATION]: reservation,
  [ApiLabel.GET_RESERVATIONS]: reservations,
  [ApiLabel.GET_STUDENTS]: students,
  [ApiLabel.GET_TIMETABLE]: timetable,
  [ApiLabel.GET_THESIS]: thesis,
  [ApiLabel.GET_THESES]: theses,
  [ApiLabel.REJECT_CLARIFICATION_REQUEST]: clarificationRequest,
  [ApiLabel.REJECT_THESIS_WITH_COMMITTEE_MEMBER]: clarificationRequest,
  [ApiLabel.REJECT_CHANGE_REQUEST]: changeRequest,
  [ApiLabel.REJECT_THESIS_WITH_COORDINATOR]: thesis,
  [ApiLabel.REQUEST_THESIS_CORRECTIONS]: thesis
};

function generateAuthData(): AuthData {
  return {
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
    expireIn: new Date().getTime() + 5 * 1000 // 5 min
  };
}

function getStudent(query: RequestParams): Student {
  const id = query.getAll().find(p => p.name === 'id')!.value;
  return students.find(s => s.id === id)!;
}

function getEmployee(query: RequestParams): Employee {
  const id = query.getAll().find(p => p.name === 'id')!.value;
  return employees.find(e => e.id === id)!;
}

function getEmployees(query?: RequestParams): Employee[] {
  let response = employees;
  const role = query?.getAll().find(p => p.name === 'role')?.value;
  if (isNotNil(role)) {
    response = response.filter(f => f.employeeRole === role);
  }
  return response;
}

function getFieldsOfStudy(query?: RequestParams): Employee[] {
  let response = employees;
  const departmentId = query?.getAll().find(p => p.name === 'departmentId')?.value;
  if (isNotNil(departmentId)) {
    response = response.filter(f => f.departmentId === departmentId);
  }
  return response;
}

function handleLabel(apiLabel: ApiLabel, query?: RequestParams): NonNullable<any> {
  switch (apiLabel) {
    case ApiLabel.LOGIN:
    case ApiLabel.REFRESH:
      return generateAuthData();
    case ApiLabel.GET_STUDENT:
      return getStudent(query!);
    case ApiLabel.GET_EMPLOYEE:
      return getEmployee(query!);
    case ApiLabel.GET_EMPLOYEES:
      return getEmployees(query);
    case ApiLabel.GET_FIELDS_OF_STUDY:
      return getFieldsOfStudy(query);
    default:
      return responseByApiKey[apiLabel];
  }
}

export const FakeData = {
  handleApiLabel(apiLabel: ApiLabel, query?: RequestParams): NonNullable<any> {
    const response = handleLabel(apiLabel, query);
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
  diplomaSession
};
