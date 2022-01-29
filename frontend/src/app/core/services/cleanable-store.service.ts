import { Selector, Store } from '@ngrx/store';
import { AppState } from '../../base/store/app-state.model';
import { distinctUntilChanged, Observable } from 'rxjs';

export abstract class CleanableStoreService {

  protected constructor(protected readonly store: Store<AppState>) {
  }

  public abstract getProgressSelector(): Selector<AppState, boolean>;

  public getStoreProgress(): Observable<boolean> {
    return this.store.select(this.getProgressSelector())
      .pipe(distinctUntilChanged());
  }

}
