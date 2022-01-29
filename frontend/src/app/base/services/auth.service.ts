import { Injectable } from '@angular/core';
import { ServerHttpService } from '../../core/services/server-http.service';
import { SettingsService } from '../../core/services/settings.service';
import { LoginData } from '../models/login-data.model';
import { delay, Observable, of } from 'rxjs';
import { AuthData } from '../models/auth-data.model';
import { ApiLabel } from '../../core/models/api-route.model';
import { FakeSessionData } from '../../../fakes/sesion-data.fake';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly http: ServerHttpService,
              private readonly settingsService: SettingsService) {
  }

  login(loginData: LoginData): Observable<AuthData> {
    const urlTemplate = this.settingsService.getServerApi(ApiLabel.LOGIN);
    if (this.settingsService.isFakeApiEnabled()) {
      return of(FakeSessionData.generateAuthData())
        .pipe(delay(this.settingsService.fakeApiDelay()));
    }
    return this.http.post(urlTemplate, loginData);
  }

  refreshToken(refreshToken: string): Observable<AuthData> {
    const urlTemplate = this.settingsService.getServerApi(ApiLabel.REFRESH);
    if (this.settingsService.isFakeApiEnabled()) {
      return of(FakeSessionData.generateAuthData())
        .pipe(delay(this.settingsService.fakeApiDelay()));
    }
    return this.http.post(urlTemplate, { refreshToken });
  }

}
