import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Thesis } from '../../../../base/models/dto/thesis.model';
import { ChangeRequest } from '../../../../base/models/dto/change-request.model';
import { Router } from '@angular/router';
import { FakeData } from '../../../../../fakes/fake.data';

@Component({
  selector: 'app-topic-change',
  templateUrl: './section-topic-change.component.html',
  styleUrls: ['./section-topic-change.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectionTopicChangeComponent {

  topic: Thesis = FakeData.thesis;

  application: ChangeRequest = FakeData.changeRequest;

  applications: ChangeRequest[] = [
    this.application,
    this.application,
    this.application,
    this.application,
    this.application,
    this.application,
    this.application
  ];

  constructor(private readonly router: Router) {
  }

  showDetails(application: ChangeRequest): void {
    this.router.navigate(['/diploma-section/change-requests/', application.id]);
  }
}
