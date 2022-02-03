package pwr.diplomaproject.controller

import io.swagger.v3.oas.annotations.Operation
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import pwr.diplomaproject.model.dto.LecturerSubjectReservationDetailsDto
import pwr.diplomaproject.model.dto.LecturerSubjectReservationDto

@RestController
@RequestMapping("/lecturer/reservation")
class LecturerReservationController {

    @Operation(summary = "Tematy prowadzącego dla których może zarządzać rezerwacjami")
    @GetMapping
    fun getSubjects(): List<LecturerSubjectReservationDto> = TODO()

    @Operation(summary = "Szczegóły tematu i zgłoszonych do niego rezerwacji")
    @GetMapping("/{id}")
    fun getSubject(@PathVariable id: Long): LecturerSubjectReservationDetailsDto = TODO()

    @Operation(summary = "Zatwierdzenie rezerwacji tematu")
    @GetMapping("/accept/{id}")
    fun acceptReservation(@PathVariable id: Long): Unit = TODO()

    @Operation(summary = "Odrzucenie rezerwacji tematu")
    @GetMapping("/reject/{id}")
    fun rejectReservation(@PathVariable id: Long): Unit = TODO()
}