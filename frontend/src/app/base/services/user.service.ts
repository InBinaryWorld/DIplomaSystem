import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/dto/user.model';
import { UserRole } from '../models/dto/user-role.model';
import { filterNotInProgress } from '../../core/tools/filter-not-in-progress';
import { map } from 'rxjs/operators';
import { UserStoreService } from './store/user-store.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private readonly userStoreService: UserStoreService) {
  }

  public getCurrentUser(ifNeededOnly = true): Observable<User | undefined> {
    this.userStoreService.loadCurrentUser(ifNeededOnly);
    return this.userStoreService.selectCurrentUser();
  }

  public getUserRolesWaitIfInProgress(ifNeededOnly = true): Observable<UserRole[] | undefined> {
    this.userStoreService.loadCurrentUser(ifNeededOnly);
    return this.userStoreService.selectUserState().pipe(
      filterNotInProgress(), map(state => state?.currentUser?.roles)
    );
  }

}
