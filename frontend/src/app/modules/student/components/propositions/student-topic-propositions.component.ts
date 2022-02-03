import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeadlinesService } from '../../../../base/services/deadlines.service';
import { SessionService } from '../../../../base/services/session.service';
import { Role } from '../../../../base/models/dto/role.model';
import { Observable, switchMap } from 'rxjs';
import { Thesis } from '../../../../base/models/dto/thesis.model';
import { RoleComponent } from '../../../../base/components/role-component.directive';
import { ThesesService } from '../../../../base/services/theses.service';
import { UserService } from '../../../../base/services/user.service';

@Component({
  selector: 'app-student-topic-propositions',
  templateUrl: './student-topic-propositions.component.html',
  styleUrls: ['./student-topic-propositions.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentTopicPropositionsComponent extends RoleComponent implements OnInit {

  proposedTheses?: Thesis[];
  canCreateNew = false;

  constructor(private readonly deadlinesService: DeadlinesService,
              private readonly thesesService: ThesesService,
              private readonly userService: UserService,
              private readonly router: Router,
              sessionService: SessionService,
              changeDetector: ChangeDetectorRef) {
    super(sessionService, changeDetector);
  }

  get roles(): Role[] {
    return [Role.STUDENT];
  }

  ngOnInit(): void {
    this.initProposedTheses();
    this.initButtonsAvailability();
  }

  private initProposedTheses(): void {
    this.addSubscription(
      this.getDataSource().subscribe(theses => {
        this.proposedTheses = theses!;
        this.markForCheck();
      })
    );
  }

  initButtonsAvailability(): void {
    this.addSubscription(
      this.userRoleSource.pipe(
        switchMap(userRole => this.deadlinesService.canCreateThesisProposition(userRole.id))
      ).subscribe(canCreateNew => {
        this.canCreateNew = canCreateNew;
        this.markForCheck();
      })
    );
  }

  private getDataSource(): Observable<Thesis[]> {
    return this.userRoleSource.pipe(
      switchMap(userRole => this.thesesService.getProposedByStudentTheses(userRole.id))
    );
  }

  public thesisDetails(thesis: Thesis): void {
    this.router.navigate(['/student/topic-propositions/details', thesis.id]).then();
  }

  public createProposition() {
    this.router.navigate(['/student/topic-propositions/create']).then();
  }

}
