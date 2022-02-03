import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AppLanguage } from '../../../core/models/app-language.model';
import { FormControl } from '@angular/forms';
import { BaseComponent } from '../../../core/components/base-component.directive';
import { UserRole } from '../../../base/models/dto/user-role.model';
import { User } from '../../../base/models/dto/user-ext.model';
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


  constructor(private readonly sessionService: SessionService,
              private readonly userService: UserService,
              changeDetector: ChangeDetectorRef) {
    super(changeDetector);
  }

  roleToId(role?: UserRole): string {
    return `${role?.role} ${role?.id}`;
  }

  ngOnInit(): void {
    this.initLanguage();
    this.initRoleContext();
  }

  private initLanguage() {
    this.addSubscription(
      this.sessionService.getLanguage().subscribe(language => {
        this.languageControl.setValue(language, { emitEvent: false });
        this.markForCheck();
      })
    );

    this.addSubscription(
      this.languageControl.valueChanges.subscribe(
        lang => this.sessionService.setLanguage(lang)
      )
    );
  }

  private initRoleContext() {
    this.addSubscription(
      this.sessionService.selectContextRole().subscribe(role => {
        this.roleContextControl.setValue(this.roleToId(role), { emitEvent: false });
        this.markForCheck();
      })
    );

    this.addSubscription(
      this.roleContextControl.valueChanges.subscribe(roleId => {
        const role = this.user?.roles.find(role => this.roleToId(role) === roleId);
        this.sessionService.setContextRole(role);
      })
    );

    this.addSubscription(
      this.userService.getCurrentUser().subscribe(user => {
        this.user = user;
        this.markForCheck();
      })
    );
  }

}
