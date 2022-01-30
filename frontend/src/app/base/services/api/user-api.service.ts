import { Injectable } from '@angular/core';
import { ServerHttpService } from '../../../core/services/server-http.service';
import { Observable } from 'rxjs';
import { ApiLabel } from '../../../core/models/api-route.model';
import { User } from '../../models/dto/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  constructor(private readonly http: ServerHttpService) {
  }

  getCurrentUser(): Observable<User> {
    return this.http.getWithLabel(ApiLabel.GET_USER);
  }

}
