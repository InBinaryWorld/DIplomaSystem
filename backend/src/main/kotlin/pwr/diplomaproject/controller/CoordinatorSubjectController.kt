package pwr.diplomaproject.controller

import io.swagger.v3.oas.annotations.Operation
import org.springframework.web.bind.annotation.*
import pwr.diplomaproject.model.dto.SubjectDetailsDto
import pwr.diplomaproject.model.dto.SubjectDto
import pwr.diplomaproject.model.form.CoordinatorCommentForm

@RestController
@RequestMapping("/coordinator/subject")
class CoordinatorSubjectController {

    @Operation(summary = "Do weryfikacji - zaproponowane tematy prac dyplomowych")
    @GetMapping("/to-verify")
    fun getSubjectsToVerify(): List<SubjectDto> = TODO()

    @Operation(summary = "Zweryfikowane - zaproponowane tematy")
    @GetMapping("/verified")
    fun getSubjectsVerified(): List<SubjectDto> = TODO()

    @Operation(summary = "Szczegóły zaproponowanego tematu")
    @GetMapping("/{id}")
    fun getSubject(@PathVariable id: Long): SubjectDetailsDto = TODO()

    @Operation(summary = "Zaakceptowanie zaproponowanego tematu")
    @GetMapping("/accept/{id}")
    fun acceptSubject(@PathVariable id: Long): Unit = TODO()

    @Operation(summary = "Zgłoszenie uwag do zaproponowanego tematu")
    @GetMapping("/comment/{id}")
    fun commentSubject(
        @PathVariable id: Long,
        @RequestBody comments: CoordinatorCommentForm): Unit = TODO()

    @Operation(summary = "Odrzucenie zaproponowanego tematu")
    @GetMapping("/reject/{id}")
    fun rejectSubject(@PathVariable id: Long): Unit = TODO()
}