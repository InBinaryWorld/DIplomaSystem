package pwr.diplomaproject.model.mail

import pwr.diplomaproject.model.entity.TopicCorrectionRequest
import pwr.diplomaproject.model.entity.User

class TopicCorrectionRequestCreatedByStudent(
    recipients: List<User>,
    topicCorrectionRequest: TopicCorrectionRequest,
    studentUser: User
) :
    Mail(
        recipients,
        "Student ${studentUser.fullName()} złożył wniosek o doprecyzowanie tematu. Nowy temat: \"${topicCorrectionRequest.newTopic}\"."
    )
