import { DiplomaSession } from '../models/dto/diploma-session.model';
import { Employee } from '../models/dto/employee.model';
import { isNil } from 'lodash-es';

export class LabelBuilder {

  public static forDiplomaSession(session: DiplomaSession): string {
    return [session.departmentName, session.fieldOfStudyName, session.year].join(', ');
  }

  public static forEmployee(employee: Employee): string {
    return [employee.title, employee.user.firstName, employee.user.lastName].filter(i => isNil(i)).join(' ');
  }

}
