import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Thesis } from '../../../../base/models/dto/thesis.model';
import { Router } from '@angular/router';
import { FakeData } from '../../../../../fakes/fake.data';

@Component({
  selector: 'app-lecturer-topics',
  templateUrl: './lecturer-topics.component.html',
  styleUrls: ['./lecturer-topics.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LecturerTopicsComponent {

  topic: Thesis = FakeData.thesis;

  public submittedTopics: Thesis[] = [];


  constructor(private readonly router: Router) {
  }

  public manageTopic(topic: Thesis): void {
    this.router.navigate(['/lecturer/topic/manage', topic.id]).then();
  }

  public reviewTopic(topic: Thesis): void {
    this.router.navigate(['/lecturer/topic/review', topic.id]).then();
  }

  public correctTopic(topic: Thesis): void {
    this.router.navigate(['/lecturer/topic/correct', topic.id]).then();
  }

  public createTopic(): void {
    this.router.navigate(['/lecturer/topic/create']).then();
  }
}
