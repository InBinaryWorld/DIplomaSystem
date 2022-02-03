import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AppTranslateService } from '../../../core/services/app-translate.service';
import { AppLanguage } from '../../../core/models/app-language.model';
import { FormControl } from '@angular/forms';
import { BaseComponent } from '../../../core/components/base-component.directive';
import { SpinnerService } from '../../../core/services/spinner.service';
import { UserRole } from '../../../base/models/dto/user-role.model';
import { AuthStoreService } from '../../../base/services/store/auth-store.service';
import { distinctUntilChanged, switchMap } from 'rxjs';
import { filterExists } from '../../../core/tools/filter-exists';
import { User } from '../../../base/models/dto/user-ext.model';
import { TranslationKeys } from '../../../base/utils/translation-keys.utils';
import { UserService } from '../../../base/services/user.service';
import { SessionService } from '../../../base/services/session.service';

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
              private readonly sessionService: SessionService,
              private readonly authStoreService: AuthStoreService,
              private readonly spinnerService: SpinnerService,
              private readonly userService: UserService,
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
        .subscribe(lang => this.sessionService.setLanguage(lang))
    );
  }

  private initRoleContext() {
    this.addSubscription(
      this.roleContextControl.valueChanges.subscribe(roleId => {
        const role = this.user?.roles.find(role => this.roleToId(role) === roleId);
        this.sessionService.setContextRole(role);
      })
    );

    this.addSubscription(
      this.sessionService.getContextRole().subscribe(role => {
        this.roleContextControl.setValue(this.roleToId(role), { emitEvent: false });
        this.markForCheck();
      })
    );

    this.addSubscription(
      this.authStoreService.getAuthData().pipe(
        filterExists(),
        distinctUntilChanged(),
        switchMap(() => this.userService.getCurrentUser(false))
      ).subscribe(user => {
        this.user = user;
        this.markForCheck();
      })
    );
  }

}
