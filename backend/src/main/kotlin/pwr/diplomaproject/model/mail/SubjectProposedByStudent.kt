package pwr.diplomaproject.model.mail

import pwr.diplomaproject.model.entity.Topic
import pwr.diplomaproject.model.entity.User

class SubjectProposedByStudent(recipients: List<User>, subject: Topic, studentUser: User) :
    Mail(recipients, "Student ${studentUser.fullName()} złożył nową propozycję tematu: ${subject.topic}.")
