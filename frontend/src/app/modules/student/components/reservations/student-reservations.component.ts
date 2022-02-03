import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Thesis } from '../../../../base/models/dto/thesis.model';
import { Router } from '@angular/router';
import { Reservation } from '../../../../base/models/dto/reservation.model';
import { DeadlinesService } from '../../../../base/services/deadlines.service';
import { ThesesService } from '../../../../base/services/theses.service';
import { SessionService } from '../../../../base/services/session.service';
import { Role } from '../../../../base/models/dto/role.model';
import { combineLatest, map, Observable, switchMap } from 'rxjs';
import { RoleComponent } from '../../../../base/components/role-component.directive';
import { UserService } from '../../../../base/services/user.service';
import { Student } from '../../../../base/models/dto/student.model';

@Component({
  selector: 'app-student-reservations',
  templateUrl: './student-reservations.component.html',
  styleUrls: ['./student-reservations.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentReservationsComponent extends RoleComponent implements OnInit {

  student?: Student;
  theses?: Thesis[];
  reservations?: Reservation[];
  activeReservation?: Reservation;

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
    this.initReservations();
    this.initButtonsAvailability();
  }

  private initReservations(): void {
    this.addSubscription(
      this.getDataSource().subscribe(([student, theses, reservations, activeReservation]) => {
        this.student = student;
        this.theses = theses;
        this.reservations = reservations;
        this.activeReservation = activeReservation;
        this.markForCheck();
      })
    );
  }

  initButtonsAvailability(): void {
    this.addSubscription(
      this.userRoleSource.pipe(
        switchMap(userRole => this.deadlinesService.canReserveThesis((userRole.id)))
      ).subscribe(canCreateClarification => {
        this.canCreateNew = canCreateClarification;
        this.markForCheck();
      })
    );
  }

  private getDataSource(): Observable<[Student, Thesis[], Reservation[], Reservation | undefined]> {
    return this.userRoleSource.pipe(
      switchMap(userRole => this.userService.getStudentForId(userRole.id)),
      switchMap(student => combineLatest([
          this.thesesService.getThesesToReserve(student.id),
          this.thesesService.getStudentReservations(student.id),
          this.thesesService.getActiveConfirmedStudentReservation(student)
        ]).pipe(map(([t, r, cr]) => ([student, t, r, cr] as
          [Student, Thesis[], Reservation[], Reservation | undefined])))
      )
    );
  }

  public topicDetails(topic: Thesis): void {
    this.router.navigate(['/student/reservations/topic', topic.id]).then();
  }

  public reserveTopic(topic: Thesis): void {
    this.router.navigate(['/student/reservations/create', topic.id]).then();
  }

  public reservationDetails(reservation: Reservation): void {
    this.router.navigate(['/student/reservations/details', reservation.id]).then();
  }

}
