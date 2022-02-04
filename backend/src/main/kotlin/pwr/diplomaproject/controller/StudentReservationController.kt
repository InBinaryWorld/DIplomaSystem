package pwr.diplomaproject.controller

import io.swagger.v3.oas.annotations.Operation
import org.springframework.http.ResponseEntity
import org.springframework.http.ResponseEntity.notFound
import org.springframework.http.ResponseEntity.ok
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
    fun getReservations(@RequestParam studentId: Long): ResponseEntity<List<StudentReservationDto>> =
        ok(studentReservationService.getReservations(studentId))

    @Operation(summary = "Dane rezerwacji studenta")
    @GetMapping("/{id}")
    fun getReservation(
        principal: Principal?,
        @RequestParam studentId: Long,
        @PathVariable id: Long
    ): ResponseEntity<StudentReservationDto> {
        val dto = studentReservationService.getReservation(studentId, id)
        return if (dto == null) notFound().build() else ok(dto)
    }


    @Operation(summary = "Potwierdzenie rezerwacji przez studenta (wstępne lub ostateczne)")
    @GetMapping("/approve/{id}")
    fun approveReservation(@PathVariable id: Long): Unit = TODO()

    @Operation(summary = "Odrzucenie rezerwacji")
    @GetMapping("/cancel/{id}")
    fun cancelReservation(@PathVariable id: Long): Unit = TODO()

    @Operation(summary = "Rezerwacja tematu (i zgłoszenie grupy)")
    @PostMapping
    fun makeReservation(
        @RequestParam studentId: Long,
        @RequestBody form: StudentReservationForm
    ): Unit = TODO()
}