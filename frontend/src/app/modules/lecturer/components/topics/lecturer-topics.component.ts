import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ThesisTopic } from '../../../../base/models/dto/thesis-topic.model';
import { Router } from '@angular/router';
import { FakeSessionData } from '../../../../../fakes/fake.data';

@Component({
  selector: 'app-lecturer-topics',
  templateUrl: './lecturer-topics.component.html',
  styleUrls: ['./lecturer-topics.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LecturerTopicsComponent {

  private topic: ThesisTopic = FakeSessionData.topic;

  public submittedTopics: ThesisTopic[] = [
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

  public manageTopic(topic: ThesisTopic): void {
    this.router.navigate(['/lecturer/topic/manage', topic.id]).then();
  }

  public reviewTopic(topic: ThesisTopic): void {
    this.router.navigate(['/lecturer/topic/review', topic.id]).then();
  }

  public correctTopic(topic: ThesisTopic): void {
    this.router.navigate(['/lecturer/topic/correct', topic.id]).then();
  }

  public createTopic(): void {
    this.router.navigate(['/lecturer/topic/create']).then();
  }
}
