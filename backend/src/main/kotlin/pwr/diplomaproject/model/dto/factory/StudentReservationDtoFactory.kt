package pwr.diplomaproject.model.dto.factory

import pwr.diplomaproject.model.dto.StudentReservationDto
import pwr.diplomaproject.model.entity.Reservation

class StudentReservationDtoFactory {

    companion object {
        fun create(reservation: Reservation): StudentReservationDto {
            val supervisorUser = reservation.topic.teacher.user
            return StudentReservationDto(reservation.id, reservation.topic.topic, supervisorUser.firstName + supervisorUser.lastName, reservation.status)
        }
    }

}