import { IdType, WithId } from './id.model';
import { EmployeeRole } from './employee-role.model';
import { UserPerson } from './user-person.model';

export interface Employee extends WithId {
  userId: IdType,
  departmentId: IdType,
  employeeRole: EmployeeRole;
  title: string,
  // additional
  user: UserPerson;
}
