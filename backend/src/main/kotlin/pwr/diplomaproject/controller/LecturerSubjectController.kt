package pwr.diplomaproject.controller

import io.swagger.v3.oas.annotations.Operation
import org.springframework.web.bind.annotation.*
import pwr.diplomaproject.model.dto.LecturerStudentProposedSubjectDetailsDto
import pwr.diplomaproject.model.dto.LecturerSubjectToCorrectDetailsDto
import pwr.diplomaproject.model.dto.SubjectDetailsDto
import pwr.diplomaproject.model.dto.SubjectDto
import pwr.diplomaproject.model.form.LecturerNewTopicForm
import pwr.diplomaproject.model.form.LecturerTopicCorrectionForm

@RestController
@RequestMapping("/lecturer/subject")
class LecturerSubjectController {

    @Operation(summary = "Zgłoszone tematy przez prowadzącego")
    @GetMapping("/proposed")
    fun getProposedSubjects(): List<SubjectDto> = TODO()

    @Operation(summary = "Szczegóły tematu zgłoszonego przez prowadzącego")
    @GetMapping("/proposed/{id}")
    fun getProposedSubject(@PathVariable id: Long): SubjectDetailsDto = TODO()

    @Operation(summary = "Zgłoszenie tematu pracy przez prowadzącego")
    @PostMapping
    fun proposeSubject(@RequestBody form: LecturerNewTopicForm): Unit = TODO()

    @Operation(summary = "Propozycje studentów tematów z udziałem prowadzącego")
    @GetMapping("/student-propositions")
    fun getStudentProposedSubjects(): List<SubjectDto> = TODO()

    @Operation(summary = "Szczegóły propozycji tematu studentów")
    @GetMapping("/student-propositions/{id}")
    fun getStudentProposedSubject(@PathVariable id: Long): LecturerStudentProposedSubjectDetailsDto = TODO()

    @Operation(summary = "Akceptacja tematu zaproponowanego przez studenta/ów")
    @GetMapping("/student-propositions/accept/{id}")
    fun acceptProposedSubject(@PathVariable id: Long): Unit = TODO()

    @Operation(summary = "Odrzucenie tematu zaproponowanego przez studenta/ów")
    @GetMapping("/student-propositions/reject/{id}")
    fun rejectProposedSubject(@PathVariable id: Long): Unit = TODO()

    @Operation(summary = "Tematy do poprawy")
    @GetMapping("/to-correct")
    fun getSubjectsToCorrect(): List<SubjectDto> = TODO()

    @Operation(summary = "Szczegóły tematu do poprawy")
    @GetMapping("/to-correct/{id}")
    fun getSubjectToCorrect(@PathVariable id: Long): LecturerSubjectToCorrectDetailsDto = TODO()

    @Operation(summary = "Poprawienie tematu oznaczonego jako do poprawy")
    @PostMapping("/to-correct")
    fun correctSubject(@RequestBody form: LecturerTopicCorrectionForm): Unit = TODO()
}