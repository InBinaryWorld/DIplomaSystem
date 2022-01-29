export interface Timetable {
  id: string;
  submittingTopics: Date;
  approvingTopicsByCoordinator: Date;
  approvingTopicsByCommittee: Date;
  selectingTopics: Date;
  certificatingTopics: Date;
  changingTopics: Date;
}
