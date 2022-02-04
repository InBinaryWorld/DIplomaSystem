package pwr.diplomaproject.service

import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service
import pwr.diplomaproject.model.dto.StudentReservationDto
import pwr.diplomaproject.model.dto.factory.StudentReservationDtoFactory
import pwr.diplomaproject.model.entity.Reservation
import pwr.diplomaproject.repository.ReservationRepository
import pwr.diplomaproject.repository.StudentRepository

@Service
class StudentReservationService(
    private val reservationRepository: ReservationRepository,
    private val studentRepository: StudentRepository
) {
    fun getReservations(studentId: Long): List<StudentReservationDto> =
        reservationRepository.findAllByStudentId(studentId)
            .map { StudentReservationDtoFactory.create(it) }

    fun getReservation(
        studentId: Long,
        reservationId: Long
    ): StudentReservationDto? {
        val reservation: Reservation? =
            studentRepository.findByIdOrNull(studentId)?.groupMembers?.map { it.reservation }
                ?.firstOrNull { reservation ->
                    reservation.id == reservationId
                }
        return if (reservation == null) null else StudentReservationDtoFactory.create(reservation)
    }
}