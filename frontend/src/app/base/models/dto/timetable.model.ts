export interface Timetable {
  id: string;
  diplomaSessionId: string;
  submittingTopics: Date;
  approvingTopicsByCoordinator: Date;
  approvingTopicsByCommittee: Date;
  selectingTopics: Date;
  certificatingTopics: Date;
  changingTopics: Date;
}
