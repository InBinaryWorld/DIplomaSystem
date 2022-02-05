package pwr.diplomaproject.model.dto.factory

import pwr.diplomaproject.model.dto.StudentSubjectDetailsDto
import pwr.diplomaproject.model.entity.Topic
import pwr.diplomaproject.model.enum.ReservationStatus

class StudentSubjectDetailsDtoFactory {
    companion object {
        fun create(topic: Topic): StudentSubjectDetailsDto = StudentSubjectDetailsDto(
            topic.id,
            topic.topic,
            topic.lecturer.fullName(),
            topic.studentCount,
            topic.description,
            topic.status,
            topic.reservation.filter { it.status == ReservationStatus.CONFIRMED } //todo upewnić się, że to mają być tylko rezerwacje confirmed
                .flatMap { it.groupMembers }
                .map { StudentNameDtoFactory.create(it.student) }
        )
    }
}