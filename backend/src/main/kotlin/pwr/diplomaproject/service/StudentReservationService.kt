package pwr.diplomaproject.service

import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service
import pwr.diplomaproject.model.dto.StudentReservationDto
import pwr.diplomaproject.model.dto.factory.StudentReservationDtoFactory
import pwr.diplomaproject.repository.ReservationRepository

@Service
class StudentReservationService(private val reservationRepository: ReservationRepository) {
    fun getReservations(): ResponseEntity<List<StudentReservationDto>> =
        ResponseEntity.ok(reservationRepository.findAll().map {
            StudentReservationDtoFactory.create(it)
        })
}