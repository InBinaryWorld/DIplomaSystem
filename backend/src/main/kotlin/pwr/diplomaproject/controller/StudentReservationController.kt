package pwr.diplomaproject.controller

import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.*
import pwr.diplomaproject.model.dto.StudentReservationDto
import pwr.diplomaproject.service.StudentReservationService

@RestController
@RequestMapping("/student/reservation")
class StudentReservationController(
    private val studentReservationService: StudentReservationService
) {

    @GetMapping
    fun getReservations(): ResponseEntity<List<StudentReservationDto>> =
        studentReservationService.getReservations()

    @GetMapping("/{id}")
    fun getReservation(@PathVariable id: Long): StudentReservationDto = TODO()

    @GetMapping("/approve/{id}")
    fun approveReservation(@PathVariable id: Long): Unit = TODO()

    @GetMapping("/cancel/{id}")
    fun cancelReservation(@PathVariable id: Long): Unit = TODO()
}