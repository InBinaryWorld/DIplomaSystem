package pwr.diplomaproject.model.dto.factory

import pwr.diplomaproject.model.dto.SubjectDto
import pwr.diplomaproject.model.entity.Topic

class SubjectDtoFactory {
    companion object {
        fun create(topic: Topic): SubjectDto = SubjectDto(
            topic.id,
            topic.topic,
            "${topic.lecturer.title} ${topic.lecturer.user.firstName} ${topic.lecturer.user.lastName}",
            topic.creationDate,
            topic.studentCount,
            topic.status
        )
    }
}