import { Injectable } from '@angular/core';
import { ServerHttpService } from '../../core/services/server-http.service';
import { SettingsService } from '../../core/services/settings.service';
import { Observable } from 'rxjs';
import { ApiLabel } from '../../core/models/api-route.model';
import { User } from '../models/dto/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private readonly http: ServerHttpService,
              private readonly settingsService: SettingsService) {
  }

  getCurrentUser(): Observable<User> {
    return this.http.getWithLabel(ApiLabel.USER);
  }

}
