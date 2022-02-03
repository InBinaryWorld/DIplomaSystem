import { IdType, WithId } from './id.model';
import { EmployeeRole } from './employee-role.model';

export interface Employee extends WithId {
  userId: IdType,
  departmentId: IdType,
  employeeRole: EmployeeRole;
  title: string,
}
