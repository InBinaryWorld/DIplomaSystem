package pwr.diplomaproject.model.mail

import pwr.diplomaproject.model.entity.Topic
import pwr.diplomaproject.model.entity.User
import pwr.diplomaproject.model.enum.TopicStatus

class SubjectPropositionResolvedByLecturer(recipients: List<User>, subject: Topic) :
    Mail(
        recipients,
        "Propozycja tematu została rozpatrzona ${if (subject.status == TopicStatus.REJECTED_BY_LECTURER) "negatywnie" else "pozytywnie"} przez prowadzącego: ${subject.topic}"
    )
