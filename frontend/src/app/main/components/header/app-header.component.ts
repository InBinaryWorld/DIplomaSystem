import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AppLanguage } from '../../../core/models/app-language.model';
import { FormControl } from '@angular/forms';
import { BaseComponent } from '../../../core/components/base-component.directive';
import { UserRole } from '../../../base/models/dto/user-role.model';
import { UserService } from '../../../base/services/user.service';
import { SessionService } from '../../../base/services/session.service';
import { switchMap, tap } from 'rxjs/operators';
import { DiplomaSession } from '../../../base/models/dto/diploma-session.model';
import { filterRoles } from '../../../core/tools/filter-roles';
import { Role } from '../../../base/models/dto/role.model';
import { GeneralResourcesService } from '../../../base/services/general-resources.service';
import { map } from 'rxjs';
import { filterExists } from '../../../core/tools/filter-exists';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppHeaderComponent extends BaseComponent implements OnInit {
  AppLanguage = AppLanguage;

  userRoles?: UserRole[];
  diplomaSessions?: DiplomaSession[];
  languageControl = new FormControl();
  roleContextControl = new FormControl();
  diplomaSessionContextControl = new FormControl();


  constructor(private readonly userService: UserService,
              private readonly sessionService: SessionService,
              private readonly generalResourcesService: GeneralResourcesService,
              changeDetector: ChangeDetectorRef) {
    super(changeDetector);
  }

  roleToId(role?: UserRole): string {
    return `${role?.role} ${role?.id}`;
  }

  ngOnInit(): void {
    this.initLanguage();
    this.initContext();
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

  private initContext() {
    this.addSubscription(
      this.sessionService.selectContext().subscribe(context => {
        this.roleContextControl.setValue(this.roleToId(context?.userRole), { emitEvent: false });
        this.diplomaSessionContextControl.setValue(context?.diplomaSession?.id, { emitEvent: false });
        this.markForCheck();
      })
    );

    this.addSubscription(
      this.roleContextControl.valueChanges.subscribe(roleId => {
        const role = this.userRoles?.find(role => this.roleToId(role) === roleId);
        this.sessionService.setContextRole(role);
      })
    );

    this.addSubscription(
      this.diplomaSessionContextControl.valueChanges.pipe(
        map(dsId => this.diplomaSessions?.find(ds => ds.id === dsId)), filterExists()
      ).subscribe(diplomaSession => this.sessionService.setContextDiplomaSession(diplomaSession))
    );

    this.addSubscription(
      this.sessionService.selectContextRole().pipe(
        tap(() => this.diplomaSessions = undefined),
        filterRoles([Role.STUDENT]),
        switchMap(studentUserRole => this.userService.getStudentForId(studentUserRole.id)),
        switchMap(student => this.generalResourcesService.getDiplomaSessionsFieldOfStudy(student.fieldOfStudyId))
      ).subscribe(diplomaSessions => {
        this.diplomaSessions = diplomaSessions;
        this.markForCheck();
      })
    );

    this.addSubscription(
      this.userService.getCurrentUser().subscribe(user => {
        this.userRoles = user?.roles;
        this.markForCheck();
      })
    );
  }

}
