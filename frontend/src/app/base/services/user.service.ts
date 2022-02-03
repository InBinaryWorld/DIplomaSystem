import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserRole } from '../models/dto/user-role.model';
import { filterNotInProgress } from '../../core/tools/filter-not-in-progress';
import { map } from 'rxjs/operators';
import { UserStoreService } from './store/user-store.service';
import { User } from '../models/dto/user.model';
import { IdType } from '../models/dto/id.model';
import { filterExists } from '../../core/tools/filter-exists';
import { UserStateKey } from '../store/user/user.state';
import { Student } from '../models/dto/student.model';
import { LoadEmployeesActionOptions } from '../store/user/user.actions';
import { Employee } from '../models/dto/employee.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private readonly userStoreService: UserStoreService) {
  }

  public getCurrentUser(ifNeededOnly = true): Observable<User | undefined> {
    return this.userStoreService.getCurrentUser(ifNeededOnly);
  }

  public invalidateStudents(): void {
    this.userStoreService.invalidateStoreForType(UserStateKey.STUDENT);
  }

  public invalidateEmployees(): void {
    this.userStoreService.invalidateStoreForType(UserStateKey.EMPLOYEE);
  }

  // public getStudents(): Observable<Student[]> {
  //   const options = LoadStudentsActionOptions;
  //   return this.userStoreService.getStudents(options);
  // }

  public getStudentForId(id: IdType): Observable<Student | undefined> {
    return this.userStoreService.getStudentForId(id);
  }

  public getAvailableSupervisors(diplomaSessionId: IdType): Observable<Employee[]> {
    const options = LoadEmployeesActionOptions.forSupervisingInDiplomaSession(diplomaSessionId);
    return this.userStoreService.getEmployees(options).pipe(filterExists());
  }

  public getEmployeeForId(id: IdType): Observable<Employee | undefined> {
    return this.userStoreService.getEmployeeForId(id);
  }

  public getUserRolesWaitIfInProgress(ifNeededOnly = true): Observable<UserRole[] | undefined> {
    this.userStoreService.loadCurrentUser(ifNeededOnly);
    return this.userStoreService.selectUserState().pipe(
      filterNotInProgress(), map(state => state?.currentUser?.roles)
    );
  }

}
