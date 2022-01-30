import { Injectable } from '@angular/core';
import { ServerHttpService } from '../../../core/services/server-http.service';
import { LoginData } from '../../models/login-data.model';
import { Observable } from 'rxjs';
import { AuthData } from '../../models/auth-data.model';
import { ApiLabel } from '../../../core/models/api-route.model';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  constructor(private readonly http: ServerHttpService) {
  }

  login(loginData: LoginData): Observable<AuthData> {
    return this.http.postWithLabel(ApiLabel.LOGIN, loginData);
  }

  refreshToken(refreshToken: string): Observable<AuthData> {
    return this.http.postWithLabel(ApiLabel.REFRESH, { refreshToken });
  }

}
