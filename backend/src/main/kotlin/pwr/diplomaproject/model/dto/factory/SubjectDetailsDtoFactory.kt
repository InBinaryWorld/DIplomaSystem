package pwr.diplomaproject.model.dto.factory

import pwr.diplomaproject.model.dto.SubjectDetailsDto
import pwr.diplomaproject.model.entity.Topic

class SubjectDetailsDtoFactory {
    companion object {
        fun create(topic: Topic): SubjectDetailsDto = SubjectDetailsDto(
            topic.id,
            topic.topic,
            topic.lecturer.fullName(),
            topic.studentCount,
            topic.description
        )
    }
}