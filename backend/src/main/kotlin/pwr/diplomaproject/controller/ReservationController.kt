package pwr.diplomaproject.controller

import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping
import pwr.diplomaproject.model.dto.ReservationDto
import pwr.diplomaproject.services.ReservationService

@Controller("/reservation")
class ReservationController(private val reservationService: ReservationService) {
    @GetMapping("")
    fun getReservations(): ResponseEntity<List<ReservationDto>> =
        reservationService.getReservations()
}