import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';

@Injectable()
export class SessionEffects {

  constructor(private readonly actions: Actions) {
  }

}
