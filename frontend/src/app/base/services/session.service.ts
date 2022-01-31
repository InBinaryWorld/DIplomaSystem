import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SessionStoreService } from './store/session-store.service';
import { UserRole } from '../models/dto/user-role.model';
import { AppLanguage } from '../../core/models/app-language.model';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private readonly sessionStoreService: SessionStoreService) {
  }

  public setContextRole(role?: UserRole): void {
    this.sessionStoreService.setContextRole(role);
  }

  public setLanguage(language: AppLanguage): void {
    this.sessionStoreService.setLanguage(language);
  }

  public getContextRole(): Observable<UserRole | undefined> {
    return this.sessionStoreService.selectSessionContextRole();
  }

  public getLanguage(): Observable<AppLanguage | undefined> {
    return this.sessionStoreService.selectSessionLanguage();
  }

  public getError(): Observable<any> {
    return this.sessionStoreService.selectError();
  }

}
