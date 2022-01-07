import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AppTranslateService } from "../../../core/services/app-translate.service";
import { AppLanguage } from "../../../core/models/app-language.model";
import { FormControl } from "@angular/forms";
import { BaseComponent } from "../../../core/components/base/base-component.directive";
import { SpinnerService } from "../../../core/services/spinner.service";
import { SessionStoreService } from "../../../modules/login/services/session-store.service";
import { SessionData } from "../../../modules/login/models/session-data.model";
import { Optional } from "../../../core/base/optional";
import { UserRole } from "../../../modules/login/models/user-role.model";

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppHeaderComponent extends BaseComponent implements OnInit {
  AppLanguage = AppLanguage;

  sessionData: Optional<SessionData>;
  languageControl = new FormControl();
  roleContextControl = new FormControl();


  constructor(private readonly translateService: AppTranslateService,
              private readonly spinnerService: SpinnerService,
              private readonly sessionStoreService: SessionStoreService,
              changeDetector: ChangeDetectorRef) {
    super(changeDetector);
  }

  getRoleLabelKey(role: UserRole): string {
    return 'Header.Role.Label.' + role.role;
  }


  ngOnInit(): void {
    this.initLanguage();
    this.initRoleContext();
  }

  private initLanguage() {
    const lang = this.translateService.getCurrentLanguage();
    this.languageControl.setValue(lang);
    this.markForCheck();
    this.addSubscription(
      this.languageControl.valueChanges.subscribe(
        lang => this.translateService.useLanguage(lang)
      )
    );
  }

  private initRoleContext() {
    this.addSubscription(
      this.roleContextControl.valueChanges
        .subscribe(role => this.sessionStoreService.setContextRole(role))
    );

    this.addSubscription(
      this.sessionStoreService.getContextRole().subscribe(role => {
        this.roleContextControl.setValue(role, { emitEvent: false });
        this.markForCheck();
      })
    );

    this.addSubscription(
      this.sessionStoreService.getSessionData().subscribe(data => {
        this.sessionData = data;
        this.markForCheck();
      })
    );
  }

}
