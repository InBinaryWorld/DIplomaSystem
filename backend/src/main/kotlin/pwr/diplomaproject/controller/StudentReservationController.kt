package pwr.diplomaproject.controller

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.*
import pwr.diplomaproject.model.dto.StudentReservationDto

@RestController
@RequestMapping("/student/reservation")
class StudentReservationController {

    @GetMapping
    fun getReservations(): List<StudentReservationDto> = TODO()

    @GetMapping("/{id}")
    fun getReservation(@PathVariable id: Long): StudentReservationDto = TODO()

    @GetMapping("/approve/{id}")
    fun approveReservation(@PathVariable id: Long): Unit = TODO()

    @GetMapping("/cancel/{id}")
    fun cancelReservation(@PathVariable id: Long): Unit = TODO()
}