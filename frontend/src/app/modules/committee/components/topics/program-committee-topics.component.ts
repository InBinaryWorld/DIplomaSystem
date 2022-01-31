import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Thesis } from '../../../../base/models/dto/thesis.model';
import { Router } from '@angular/router';
import { FakeSessionData } from '../../../../../fakes/fake.data';

@Component({
  selector: 'app-lecturer-topics',
  templateUrl: './program-committee-topics.component.html',
  styleUrls: ['./program-committee-topics.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgramCommitteeTopicsComponent {

  private topic: Thesis = FakeSessionData.thesis;

  public topicsApprovedByCoordinator: Thesis[] = [
    this.topic,
    this.topic,
    this.topic,
    this.topic,
    this.topic,
    this.topic,
    this.topic,
    this.topic
  ];


  constructor(private readonly router: Router) {
  }

  public reviewTopic(topic: Thesis): void {
    this.router.navigate(['/program-committee/topic', topic.id]).then();
  }
}
