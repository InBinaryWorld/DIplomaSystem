import { Injectable } from '@angular/core';
import { SessionStoreService } from '../../../base/services/session-store.service';

@Injectable({
  providedIn: 'root'
})
export class StudentViewService {

  constructor(private readonly sessionStoreService: SessionStoreService
  ) {
  }
  

}
