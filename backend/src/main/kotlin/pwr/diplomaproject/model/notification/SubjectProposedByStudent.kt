package pwr.diplomaproject.model.notification

import pwr.diplomaproject.model.entity.Topic
import pwr.diplomaproject.model.entity.User
import pwr.diplomaproject.repository.NotificationRepository

class SubjectProposedByStudent(
    recipients: List<User>,
    subject: Topic, studentUser: User,
    notificationRepository: NotificationRepository
) :
    NotificationAlert(
        recipients,
        constructContent(
            notificationRepository.findByLabel("ReservationCreatedByStudent").content, mapOf(
                ":STUDENT" to studentUser.fullName(),
                ":TOPIC" to subject.topic,
            )
        )
    )
