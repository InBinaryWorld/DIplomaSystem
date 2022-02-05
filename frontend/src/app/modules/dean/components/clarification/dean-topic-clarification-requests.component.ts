import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClarificationRequest } from '../../../../base/models/dto/clarification-request.model';
import { PermissionsService } from '../../../../base/services/permissions.service';
import { RequestsService } from '../../../../base/services/requests.service';
import { SessionService } from '../../../../base/services/session.service';
import { Role } from '../../../../base/models/dto/role.model';
import { switchMap } from 'rxjs';
import { filterExists } from '../../../../core/tools/filter-exists';
import { RoleComponent } from '../../../../base/components/role-component.directive';
import { partition } from 'lodash-es';
import { RequestStatus } from '../../../../base/models/dto/request-status.model';

@Component({
  selector: 'app-topic-change-requests',
  templateUrl: './dean-topic-clarification-requests.component.html',
  styleUrls: ['./dean-topic-clarification-requests.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeanTopicClarificationRequestsComponent extends RoleComponent implements OnInit {

  requestsToConsider?: ClarificationRequest[];
  requestsConsidered?: ClarificationRequest[];

  constructor(private readonly deadlinesService: PermissionsService,
              private readonly requestsService: RequestsService,
              private readonly router: Router,
              sessionService: SessionService,
              changeDetector: ChangeDetectorRef) {
    super(sessionService, changeDetector);
  }

  get roles(): Role[] {
    return [Role.DEAN];
  }

  ngOnInit(): void {
    this.initClarificationRequests();
  }

  private initClarificationRequests(): void {
    this.addSubscription(
      this.contextSource.pipe(switchMap(context =>
          this.requestsService.getClarificationRequestsForDean(context.diplomaSession!.id, context.userRole.id)),
        filterExists()
      ).subscribe(requests => {
        const parts = partition(requests, r => r.status === RequestStatus.WAITING);
        this.requestsToConsider = parts[0];
        this.requestsConsidered = parts[1];
        this.markForCheck();
      })
    );
  }

  showDetails(application: ClarificationRequest): void {
    this.router.navigate(['/dean/clarification/', application.id]);
  }
}
