package pwr.diplomaproject.controller

import io.swagger.v3.oas.annotations.Operation
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import pwr.diplomaproject.model.dto.GraduationScheduleDto

@RestController
@RequestMapping("/graduation/schedule")
class GraduationScheduleController {

    @Operation(summary = "Zwraca aktywne harmonogramy")
    @GetMapping("/active")
    fun activeSchedules(): List<GraduationScheduleDto> = TODO()

    @Operation(summary = "Zwraca archiwalne harmonogramy")
    @GetMapping("/archival")
    fun archivalSchedules(): List<GraduationScheduleDto> = TODO()

    // TODO endpointy do wyświetlenia, edycji i dodawania harmonogramów
}