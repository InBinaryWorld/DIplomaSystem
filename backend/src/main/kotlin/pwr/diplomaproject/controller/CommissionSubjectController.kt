package pwr.diplomaproject.controller

import io.swagger.v3.oas.annotations.Operation
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import pwr.diplomaproject.model.dto.SubjectDetailsDto
import pwr.diplomaproject.model.dto.SubjectDto

@RestController
@RequestMapping("/commission/subject")
class CommissionSubjectController {

    @Operation(summary = "Do weryfikacji - zgłoszone tematy")
    @GetMapping("/to-verify")
    fun getSubjectsToVerify(): List<SubjectDto> = TODO()

    @Operation(summary = "Zweryfikowane - zgłoszone tematy")
    @GetMapping("/verified")
    fun getSubjectVerified(): List<SubjectDto> = TODO()

    @Operation(summary = "Szczegóły tematu do rozpatrzenia")
    @GetMapping("{id}")
    fun getSubject(@PathVariable id: Long): SubjectDetailsDto = TODO()

    @Operation(summary = "Zaakceptowanie zgłoszonego tematu")
    @GetMapping("/accept/{id}")
    fun acceptSubject(@PathVariable id: Long): Unit = TODO()

    @Operation(summary = "Odrzucenie zgłoszonego tematu")
    @GetMapping("/reject/{id}")
    fun rejectSubject(@PathVariable id: Long): Unit = TODO()
}