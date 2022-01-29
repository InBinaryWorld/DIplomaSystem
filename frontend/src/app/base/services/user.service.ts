import { Injectable } from '@angular/core';
import { ServerHttpService } from '../../core/services/server-http.service';
import { SettingsService } from '../../core/services/settings.service';
import { delay, Observable, of } from 'rxjs';
import { ApiLabel } from '../../core/models/api-route.model';
import { FakeSessionData } from '../../../fakes/sesion-data.fake';
import { User } from '../models/dto/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private readonly http: ServerHttpService,
              private readonly settingsService: SettingsService) {
  }

  getCurrentUser(): Observable<User> {
    const urlTemplate = this.settingsService.getServerApi(ApiLabel.USER);
    if (this.settingsService.isFakeApiModeOn()) {
      return of(FakeSessionData.getByLabel(ApiLabel.USER)).pipe(delay(2000));
    }
    return this.http.get(urlTemplate);
  }

}
