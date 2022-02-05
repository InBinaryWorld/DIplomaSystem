package pwr.diplomaproject.controller

import io.swagger.v3.oas.annotations.Operation
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
    fun getReservations(
        @RequestParam studentId: Long,
        @RequestParam diplomaSessionId: Long,
    ): List<StudentReservationDto> =
        studentReservationService.getReservations(studentId, diplomaSessionId)

    @Operation(summary = "Dane rezerwacji studenta")
    @GetMapping("/{id}")
    fun getReservation(
        @RequestParam studentId: Long,
        @PathVariable id: Long
    ): StudentReservationDto =
        studentReservationService.getReservation(studentId, id)

    @Operation(summary = "Potwierdzenie rezerwacji przez studenta (wstępne lub ostateczne)")
    @GetMapping("/approve/{id}")
    fun approveReservation(
        @RequestParam studentId: Long,
        @PathVariable id: Long
    ): Unit =
        studentReservationService.approveReservation(studentId, id)

    @Operation(summary = "Odrzucenie rezerwacji")
    @GetMapping("/cancel/{id}")
    fun cancelReservation(
        @RequestParam studentId: Long,
        @PathVariable id: Long
    ): Unit =
        studentReservationService.cancelReservation(studentId, id)

    @Operation(summary = "Rezerwacja tematu (i zgłoszenie grupy)")
    @PostMapping
    fun makeReservation(
        @RequestParam studentId: Long,
        @RequestBody form: StudentReservationForm
    ): Unit =
        studentReservationService.makeReservation(studentId, form)
}