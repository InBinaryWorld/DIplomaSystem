package pwr.diplomaproject.services

import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service
import pwr.diplomaproject.model.dto.ReservationDto
import pwr.diplomaproject.repository.ReservationRepository

@Service
class ReservationService(private val reservationRepository: ReservationRepository) {
    fun getReservations(): ResponseEntity<List<ReservationDto>> =
        ResponseEntity.ok(reservationRepository.findAll().map {
            it.toDto()
        })
}
