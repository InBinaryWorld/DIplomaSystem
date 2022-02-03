package pwr.diplomaproject.controller

import io.swagger.v3.oas.annotations.Operation
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import pwr.diplomaproject.model.dto.StudentReservationDto
import pwr.diplomaproject.model.form.StudentReservationForm
import pwr.diplomaproject.service.StudentReservationService
import java.security.Principal

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
    @GetMapping("/{studentId}/{reservationId}")
    fun getReservation(
        principal: Principal?,
        @PathVariable studentId: Long,
        @PathVariable reservationId: Long
    ): ResponseEntity<StudentReservationDto> =
        studentReservationService.getReservation(studentId, reservationId)

    @Operation(summary = "Potwierdzenie rezerwacji przez studenta (wstępne lub ostateczne)")
    @GetMapping("/approve/{id}")
    fun approveReservation(@PathVariable id: Long): Unit = TODO()

    @Operation(summary = "Odrzucenie rezerwacji")
    @GetMapping("/cancel/{id}")
    fun cancelReservation(@PathVariable id: Long): Unit = TODO()

    @Operation(summary = "Rezerwacja tematu (i zgłoszenie grupy)")
    @PostMapping
    fun makeReservation(@RequestBody form: StudentReservationForm): Unit = TODO()
}