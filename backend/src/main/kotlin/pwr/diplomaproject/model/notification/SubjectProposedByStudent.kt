package pwr.diplomaproject.model.notification

import pwr.diplomaproject.model.entity.Topic
import pwr.diplomaproject.model.entity.User

class SubjectProposedByStudent(recipients: List<User>, subject: Topic, studentUser: User) :
    NotificationAlert(recipients, "Student ${studentUser.fullName()} złożył nową propozycję tematu: ${subject.topic}.")
