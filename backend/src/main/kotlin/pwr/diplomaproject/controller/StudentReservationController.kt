package pwr.diplomaproject.controller

import io.swagger.v3.oas.annotations.Operation
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import pwr.diplomaproject.model.dto.StudentReservationDto
import pwr.diplomaproject.service.StudentReservationService

@RestController
@RequestMapping("/student/reservation")
class StudentReservationController(
    private val studentReservationService: StudentReservationService
) {

    @Operation(summary = "Złożone rezerwacje zalogowanego studenta")
    @GetMapping
    fun getReservations(): ResponseEntity<List<StudentReservationDto>> =
        studentReservationService.getReservations()

    @Operation(summary = "Dane rezerwacji studenta")
    @GetMapping("/{id}")
    fun getReservation(@PathVariable id: Long): StudentReservationDto = TODO()

    @Operation(summary = "Ostateczne potwierdzenie rezerwacji przez studenta")
    @GetMapping("/approve/{id}")
    fun approveReservation(@PathVariable id: Long): Unit = TODO()

    @Operation(summary = "Odrzucenie rezerwacji")
    @GetMapping("/cancel/{id}")
    fun cancelReservation(@PathVariable id: Long): Unit = TODO()
}