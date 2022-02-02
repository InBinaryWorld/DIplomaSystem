package pwr.diplomaproject.controller

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import pwr.diplomaproject.model.dto.StudentReservationDto

@RestController("/student/reservation")
class StudentReservationController {

    @GetMapping
    fun getReservations(): List<StudentReservationDto> = TODO()

    @GetMapping
    fun getReservation(@RequestParam id: Long): StudentReservationDto = TODO()

    @GetMapping("/approve")
    fun approveReservation(@RequestParam id: Long): Unit = TODO()

    @GetMapping("/cancel")
    fun cancelReservation(@RequestParam id: Long): Unit = TODO()
}