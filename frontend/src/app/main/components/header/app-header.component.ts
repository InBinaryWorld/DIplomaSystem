import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AppTranslateService } from '../../../core/services/app-translate.service';
import { AppLanguage } from '../../../core/models/app-language.model';
import { FormControl } from '@angular/forms';
import { BaseComponent } from '../../../core/components/base-component.directive';
import { SpinnerService } from '../../../core/services/spinner.service';
import { UserRole } from '../../../base/models/dto/user-role.model';
import { SessionStoreService } from '../../../base/services/session-store.service';
import { UserStoreService } from '../../../base/services/user-store.service';
import { AuthStoreService } from '../../../base/services/auth-store.service';
import { distinctUntilChanged, switchMap } from 'rxjs';
import { filterExists } from '../../../core/tools/filter-exists';
import { User } from '../../../base/models/dto/user.model';
import { TranslationKeys } from '../../../core/utils/translation-keys.utils';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppHeaderComponent extends BaseComponent implements OnInit {
  AppLanguage = AppLanguage;

  user?: User;
  languageControl = new FormControl();
  roleContextControl = new FormControl();


  constructor(private readonly translateService: AppTranslateService,
              private readonly sessionStoreService: SessionStoreService,
              private readonly authStoreService: AuthStoreService,
              private readonly userStoreService: UserStoreService,
              private readonly spinnerService: SpinnerService,
              changeDetector: ChangeDetectorRef) {
    super(changeDetector);
  }

  getRoleLabelKey(role: UserRole): string {
    return TranslationKeys.forRole(role.role);
  }

  roleToId(role?: UserRole): string {
    return `${role?.role} ${role?.id}`;
  }

  ngOnInit(): void {
    this.initLanguage();
    this.initRoleContext();
  }

  private initLanguage() {
    const lang = this.translateService.getCurrentLanguage();
    this.languageControl.setValue(lang);
    this.handleLangControlChanges();
    this.markForCheck();

  }

  private handleLangControlChanges(): void {
    this.addSubscription(
      this.languageControl.valueChanges
        .subscribe(lang => this.sessionStoreService.setLanguage(lang))
    );
  }

  private initRoleContext() {
    this.addSubscription(
      this.roleContextControl.valueChanges.subscribe(roleId => {
        const role = this.user?.roles.find(role => this.roleToId(role) === roleId);
        this.sessionStoreService.setContextRole(role);
      })
    );

    this.addSubscription(
      this.sessionStoreService.getContextRole().subscribe(role => {
        this.roleContextControl.setValue(this.roleToId(role), { emitEvent: false });
        this.markForCheck();
      })
    );

    this.addSubscription(
      this.authStoreService.getAuthData().pipe(
        filterExists(),
        distinctUntilChanged(),
        switchMap(() => this.userStoreService.getCurrentUser(false))
      ).subscribe(user => {
        this.user = user;
        this.markForCheck();
      })
    );
  }

}
