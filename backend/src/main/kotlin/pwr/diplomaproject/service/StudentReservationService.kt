package pwr.diplomaproject.service

import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service
import pwr.diplomaproject.model.dto.StudentReservationDto
import pwr.diplomaproject.model.dto.factory.StudentReservationDtoFactory
import pwr.diplomaproject.repository.ReservationRepository
import pwr.diplomaproject.repository.StudentRepository

@Service
class StudentReservationService(
    private val reservationRepository: ReservationRepository,
    private val studentRepository: StudentRepository
) {
    fun getReservations(studentId: Long): List<StudentReservationDto> =
        reservationRepository.findByStudentId(studentId)
            .map { StudentReservationDtoFactory.create(it) }

    fun getReservation(
        studentId: Long,
        reservationId: Long
    ): ResponseEntity<StudentReservationDto> {
//        val student: Any = studentRepository.findById(studentId).map { it.groupMembers }
        return ResponseEntity.ok(null)
    }
}