import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AppTranslateService } from '../../../core/services/app-translate.service';
import { spinnerName, SpinnerService } from '../../../core/services/spinner.service';
import { CleanableService } from '../../../core/services/cleanable.service';
import { AuthStoreService } from '../../../base/services/auth-store.service';
import { BaseComponent } from '../../../core/components/base/base-component.directive';
import { AppState } from '../../../base/store/app-state.model';
import { Store } from '@ngrx/store';
import { CleanableStoreService } from '../../../core/services/cleanable-store.service';
import { ContextRoutingService } from '../../../core/services/context-routing.service';
import { SessionStoreService } from '../../../base/services/session-store.service';
import { UserStoreService } from '../../../base/services/user-store.service';
import { RequestsStoreService } from '../../../base/services/requests-store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent extends BaseComponent implements OnInit {
  spinnerName = spinnerName;

  constructor(private readonly contextRoutingService: ContextRoutingService,
              private readonly requestsStoreService: RequestsStoreService,
              private readonly translationsService: AppTranslateService,
              private readonly sessionStoreService: SessionStoreService,
              private readonly authStoreService: AuthStoreService,
              private readonly userStoreService: UserStoreService,
              private readonly spinnerService: SpinnerService,
              private readonly store: Store<AppState>,
              changeDetector: ChangeDetectorRef) {
    super(changeDetector);
  }

  ngOnInit(): void {
    this.initStoreSpinners();
    this.initServices();
  }

  protected initServices(): void {
    const services: CleanableService[] = [
      this.contextRoutingService,
      this.translationsService
    ];
    services.forEach(service => service.init(this, this.changeDetector));
  }

  private initStoreSpinners(): void {
    const services: CleanableStoreService[] = [
      this.requestsStoreService,
      this.sessionStoreService,
      this.authStoreService,
      this.userStoreService
    ];
    services.forEach(service => this.initStoreSpinner(service));
  }


  private initStoreSpinner(service: CleanableStoreService): void {
    this.addSubscription(
      service.getStoreProgress().subscribe(
        inProgress => this.spinnerService.act(inProgress, this.changeDetector)
      )
    );
  }
}
