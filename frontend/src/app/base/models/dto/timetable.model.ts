import { WithId } from './id.model';

export interface Timetable extends WithId {
  diplomaSessionId: string;
  submittingTopics: Date;
  approvingTopicsByCoordinator: Date;
  approvingTopicsByCommittee: Date;
  selectingTopics: Date;
  clarificationTopics: Date;
  changingTopics: Date;
}
