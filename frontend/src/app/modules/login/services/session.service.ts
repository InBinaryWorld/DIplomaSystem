import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { LoginData } from '../models/login-data.model';
import { SessionData } from '../models/session-data.model';
import { ServerHttpService } from "../../../core/services/server-http.service";
import { SettingsService } from "../../../core/services/settings.service";
import { ApiName } from "../../../core/models/api-route.model";
import { FakeSessionData } from "../../../../fakes/sesion-data.fake";

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private readonly proxyService: ServerHttpService,
              private readonly settingsService: SettingsService) {
  }

  login(loginData: LoginData): Observable<SessionData> {
    const urlTemplate = this.settingsService.getServerApi(ApiName.LOGIN);
    // TODO:
    return of(FakeSessionData.studentSession).pipe(delay(1500))
    // return this.proxyService.postWithoutAuth(urlTemplate, loginData);
  }

  logout(): Observable<void> {
    return of(undefined);
  }

}
