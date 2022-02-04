import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PermissionsService } from '../../../../base/services/permissions.service';
import { RequestsService } from '../../../../base/services/requests.service';
import { SessionService } from '../../../../base/services/session.service';
import { Role } from '../../../../base/models/dto/role.model';
import { switchMap } from 'rxjs';
import { filterExists } from '../../../../core/tools/filter-exists';
import { partition } from 'lodash-es';
import { RequestStatus } from '../../../../base/models/dto/request-status.model';
import { RoleComponent } from '../../../../base/components/role-component.directive';
import { ChangeRequest } from '../../../../base/models/dto/change-request.model';

@Component({
  selector: 'app-program-committee-topic-change',
  templateUrl: './program-committee-topic-change.component.html',
  styleUrls: ['./program-committee-topic-change.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgramCommitteeTopicChangeComponent extends RoleComponent implements OnInit {

  requestsToConsider?: ChangeRequest[];
  requestsConsidered?: ChangeRequest[];

  constructor(private readonly deadlinesService: PermissionsService,
              private readonly requestsService: RequestsService,
              private readonly router: Router,
              sessionService: SessionService,
              changeDetector: ChangeDetectorRef) {
    super(sessionService, changeDetector);
  }

  get roles(): Role[] {
    return [Role.PROGRAM_COMMITTEE_MEMBER];
  }

  ngOnInit(): void {
    this.initRequests();
  }

  private initRequests(): void {
    this.addSubscription(
      this.userRoleSource.pipe(
        switchMap(userRole => this.requestsService.getChangeRequestsForRole(userRole)),
        filterExists()
      ).subscribe(requests => {
        const parts = partition(requests, r => r.status === RequestStatus.WAITING);
        this.requestsToConsider = parts[0];
        this.requestsConsidered = parts[1];
        this.markForCheck();
      })
    );
  }

  showDetails(application: ChangeRequest): void {
    this.router.navigate(['/program-committee/change-requests/', application.id]);
  }
}
