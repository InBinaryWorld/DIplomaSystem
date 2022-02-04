package pwr.diplomaproject.controller

import io.swagger.v3.oas.annotations.Operation
import org.springframework.http.ResponseEntity
import org.springframework.http.ResponseEntity.*
import org.springframework.web.bind.annotation.*
import pwr.diplomaproject.model.dto.StudentReservationDto
import pwr.diplomaproject.model.form.StudentReservationForm
import pwr.diplomaproject.service.StudentReservationService

@RestController
@RequestMapping("/student/reservation")
class StudentReservationController(
    private val studentReservationService: StudentReservationService
) {

    @Operation(summary = "Złożone rezerwacje zalogowanego studenta")
    @GetMapping
    fun getReservations(@RequestParam studentId: Long): ResponseEntity<List<StudentReservationDto>> =
        ok(studentReservationService.getReservations(studentId))

    @Operation(summary = "Dane rezerwacji studenta")
    @GetMapping("/{reservationId}")
    fun getReservation(
        @RequestParam studentId: Long,
        @PathVariable reservationId: Long
    ): ResponseEntity<StudentReservationDto> {
        val dto = studentReservationService.getReservation(studentId, reservationId)
        return if (dto == null) notFound().build() else ok(dto)
    }

    @Operation(summary = "Potwierdzenie rezerwacji przez studenta (wstępne lub ostateczne)")
    @GetMapping("/approve/{reservationId}")
    fun approveReservation(
        @RequestParam studentId: Long,
        @PathVariable reservationId: Long
    ): ResponseEntity<Unit> =
        if (studentReservationService.approveReservation(studentId, reservationId))
            ok().build()
        else badRequest().build()

    @Operation(summary = "Odrzucenie rezerwacji")
    @GetMapping("/cancel/{reservationId}")
    fun cancelReservation(
        @RequestParam studentId: Long,
        @PathVariable reservationId: Long
    ): ResponseEntity<Unit> =
        if (studentReservationService.cancelReservation(studentId, reservationId))
            ok().build()
        else badRequest().build()

    @Operation(summary = "Rezerwacja tematu (i zgłoszenie grupy)")
    @PostMapping
    fun makeReservation(
        @RequestParam studentId: Long,
        @RequestBody form: StudentReservationForm
    ): Unit = TODO()
}