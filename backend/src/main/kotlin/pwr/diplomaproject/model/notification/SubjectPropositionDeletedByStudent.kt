package pwr.diplomaproject.model.notification

import pwr.diplomaproject.model.entity.Topic
import pwr.diplomaproject.model.entity.User

class SubjectPropositionDeletedByStudent(recipients: List<User>, subject: Topic, studentUser: User) :
    NotificationAlert(
        recipients,
        "Propozycja tematu \"${subject.topic}\" została usunięta przez studenta ${studentUser.fullName()}."
    )