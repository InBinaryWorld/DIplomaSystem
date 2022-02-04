package pwr.diplomaproject.model.dto.factory

import pwr.diplomaproject.model.dto.SubjectDetailsDto
import pwr.diplomaproject.model.entity.Topic

class SubjectDetailsDtoFactory {
    companion object {
        fun create(topic: Topic): SubjectDetailsDto = SubjectDetailsDto(
            topic.id,
            topic.topic,
            "${topic.lecturer.title} ${topic.lecturer.user.firstName} ${topic.lecturer.user.lastName}",
            topic.studentCount,
            topic.description
        )
    }
}