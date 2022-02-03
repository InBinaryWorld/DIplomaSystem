import { DiplomaSession } from '../models/dto/diploma-session.model';
import { Employee } from '../models/dto/employee.model';
import { isNotNil } from '../../core/tools/is-not-nil';

export class LabelBuilder {

  public static forDiplomaSession(session: DiplomaSession): string {
    return [session.fieldOfStudy.name, session.year].join(', ');
  }

  public static forEmployee(employee: Employee): string {
    return [employee.title, employee.user.firstName, employee.user.lastName].filter(i => isNotNil(i)).join(' ');
  }

}
