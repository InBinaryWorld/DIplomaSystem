import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeIfNil } from '../../../core/tools/If-needed-only-functions';
import { map } from 'rxjs/operators';
import { setLanguageIfNeededAction } from './session.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../app-state.model';
import { selectSessionLanguage } from './session.selectors';

@Injectable()
export class SessionEffects {


  setLanguageIfNeededAction = createEffect(() => this.actions.pipe(
    ofType(setLanguageIfNeededAction),
    mergeIfNil(() => this.store.select(selectSessionLanguage)),
    map(({ language }) => setLanguageIfNeededAction({ language }))
  ));


  constructor(private readonly actions: Actions,
              private readonly store: Store<AppState>) {
  }

}
