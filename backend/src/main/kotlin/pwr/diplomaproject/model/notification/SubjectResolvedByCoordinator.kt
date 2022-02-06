package pwr.diplomaproject.model.notification

import pwr.diplomaproject.model.entity.Topic
import pwr.diplomaproject.model.entity.User

class SubjectResolvedByCoordinator(recipients: List<User>, subject: Topic) :
    NotificationAlert(
        recipients,
        "Temat ${subject.topic} został rozpatrzony przez koordynatora. Aktualny status: ${subject.status}. Uwagi: ${subject.coordinatorComments}."
    )
