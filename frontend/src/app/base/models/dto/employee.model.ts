import { IdType, IdTypeSerializer, WithId } from './id.model';
import { EmployeeRole } from './employee-role.model';
import { UserPerson } from './user-person.model';
import { autoserialize, autoserializeAs, inheritSerialization } from 'cerialize';

@inheritSerialization(WithId)
export class Employee extends WithId {

  @autoserializeAs(IdTypeSerializer)
  userId!: IdType;

  @autoserializeAs(IdTypeSerializer)
  departmentId!: IdType;

  @autoserializeAs(EmployeeRole)
  employeeRole!: EmployeeRole;

  @autoserialize
  title!: string;

  @autoserializeAs(UserPerson)
  user!: UserPerson;
}
