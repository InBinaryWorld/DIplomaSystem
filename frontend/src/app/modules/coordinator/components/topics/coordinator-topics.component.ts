import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Thesis } from '../../../../base/models/dto/thesis.model';
import { Router } from '@angular/router';
import { FakeSessionData } from '../../../../../fakes/fake.data';

@Component({
  selector: 'app-topic-change-requests',
  templateUrl: './coordinator-topics.component.html',
  styleUrls: ['./coordinator-topics.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoordinatorTopicsComponent {
  private topic: Thesis = FakeSessionData.thesis;

  public topics: Thesis[] = [
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
    this.router.navigate(['/coordinator/topic', topic.id]).then();
  }
}
