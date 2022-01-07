import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AppTranslateService } from "../../../core/services/app-translate.service";
import { spinnerName } from "../../../core/services/spinner.service";
import { CleanableService } from "../../../core/services/cleanable.service";
import { SessionStoreService } from "../../../modules/login/services/session-store.service";
import { BaseComponent } from "../../../core/components/base/base-component.directive";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent extends BaseComponent implements OnInit {
  spinnerName = spinnerName;

  constructor(private readonly translationsService: AppTranslateService,
              private readonly sessionStoreService: SessionStoreService,
              changeDetector: ChangeDetectorRef) {
    super(changeDetector);
  }

  ngOnInit(): void {
    this.initServices();
  }

  protected initServices(): void {
    const services: CleanableService[] = [
      this.translationsService,
      this.sessionStoreService
    ]
    services.forEach(service => service.init(this, this.changeDetector));
  }

}
