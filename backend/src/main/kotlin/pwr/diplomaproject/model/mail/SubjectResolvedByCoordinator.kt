package pwr.diplomaproject.model.mail

import pwr.diplomaproject.model.entity.Topic
import pwr.diplomaproject.model.entity.User

class SubjectResolvedByCoordinator(recipients: List<User>, subject: Topic) :
    Mail(
        recipients,
        "Temat ${subject.topic} został rozpatrzony przez koordynatora. Aktualny status: ${subject.status}. Uwagi: ${subject.coordinatorComments}."
    )
