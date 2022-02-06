package pwr.diplomaproject.model.notification

import pwr.diplomaproject.model.entity.TopicCorrectionRequest
import pwr.diplomaproject.model.entity.User

class TopicCorrectionRequestCreatedByStudent(
    recipients: List<User>,
    topicCorrectionRequest: TopicCorrectionRequest,
    studentUser: User
) :
    NotificationAlert(
        recipients,
        "Student ${studentUser.fullName()} złożył wniosek o doprecyzowanie tematu. Nowy temat: \"${topicCorrectionRequest.newTopic}\"."
    )
