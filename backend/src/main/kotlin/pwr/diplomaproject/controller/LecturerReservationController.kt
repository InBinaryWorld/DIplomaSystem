package pwr.diplomaproject.controller

import io.swagger.v3.oas.annotations.Operation
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import pwr.diplomaproject.model.dto.LecturerSubjectReservationDetailsDto
import pwr.diplomaproject.model.dto.LecturerSubjectReservationDto
import pwr.diplomaproject.service.LecturerReservationService
import pwr.diplomaproject.util.userId
import java.security.Principal

@RestController
@RequestMapping("/lecturer/reservation")
class LecturerReservationController @Autowired constructor(
    private val lecturerReservationService: LecturerReservationService
) {

    @Operation(summary = "Tematy prowadzącego dla których może zarządzać rezerwacjami")
    @GetMapping
    fun getSubjects(principal: Principal): List<LecturerSubjectReservationDto> =
        lecturerReservationService.getSubjects(principal.userId)

    @Operation(summary = "Szczegóły tematu i zgłoszonych do niego rezerwacji")
    @GetMapping("/{id}")
    fun getSubject(
        principal: Principal,
        @PathVariable id: Long): LecturerSubjectReservationDetailsDto =
        lecturerReservationService.getSubject(principal.userId, id)

    @Operation(summary = "Zatwierdzenie rezerwacji tematu")
    @GetMapping("/accept/{id}")
    fun acceptReservation(
        principal: Principal,
        @PathVariable id: Long): Unit =
        lecturerReservationService.acceptReservation(principal.userId, id)

    @Operation(summary = "Odrzucenie rezerwacji tematu")
    @GetMapping("/reject/{id}")
    fun rejectReservation(
        principal: Principal,
        @PathVariable id: Long): Unit =
        lecturerReservationService.rejectReservation(principal.userId, id)
}