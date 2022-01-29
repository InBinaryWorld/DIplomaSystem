import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ThesisTopic } from '../../../../base/models/dto/thesis-topic.model';
import { Router } from '@angular/router';
import { FakeSessionData } from '../../../../../fakes/fake.data';

@Component({
  selector: 'app-topic-change-requests',
  templateUrl: './coordinator-topics.component.html',
  styleUrls: ['./coordinator-topics.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoordinatorTopicsComponent {
  private topic: ThesisTopic = FakeSessionData.topic;

  public topics: ThesisTopic[] = [
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

  public reviewTopic(topic: ThesisTopic): void {
    this.router.navigate(['/coordinator/topic', topic.id]).then();
  }
}
