package pwr.diplomaproject.model.mail

import pwr.diplomaproject.model.entity.Topic
import pwr.diplomaproject.model.entity.User

class SubjectProposedByStudent(recipients: List<User>, subject: Topic) :
    Mail(recipients, "Pojawiła się nowa propozycja tematu: ${subject.topic}")
