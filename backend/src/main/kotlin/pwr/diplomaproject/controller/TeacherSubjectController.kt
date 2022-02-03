package pwr.diplomaproject.controller

import io.swagger.v3.oas.annotations.Operation
import org.springframework.web.bind.annotation.*
import pwr.diplomaproject.model.dto.TeacherStudentProposedSubjectDetailsDto
import pwr.diplomaproject.model.dto.TeacherSubjectDetailsDto
import pwr.diplomaproject.model.dto.TeacherSubjectDto
import pwr.diplomaproject.model.dto.TeacherSubjectToCorrectDetailsDto
import pwr.diplomaproject.model.form.TeacherNewTopicForm
import pwr.diplomaproject.model.form.TeacherTopicCorrectionForm

@RestController
@RequestMapping("/teacher/subject")
class TeacherSubjectController {

    @Operation(summary = "Zgłoszone tematy przez prowadzącego")
    @GetMapping("/proposed")
    fun getProposedSubjects(): List<TeacherSubjectDto> = TODO()

    @Operation(summary = "Szczegóły tematu zgłoszonego przez prowadzącego")
    @GetMapping("/proposed/{id}")
    fun getProposedSubject(@PathVariable id: Long): TeacherSubjectDetailsDto = TODO()

    @Operation(summary = "Zgłoszenie tematu pracy przez prowadzącego")
    @PostMapping
    fun proposeSubject(@RequestBody form: TeacherNewTopicForm): Unit = TODO()

    @Operation(summary = "Propozycje studentów tematów z udziałem prowadzącego")
    @GetMapping("/student-propositions")
    fun getStudentProposedSubjects(): List<TeacherSubjectDto> = TODO()

    @Operation(summary = "Szczegóły propozycji tematu studentów")
    @GetMapping("/student-propositions/{id}")
    fun getStudentProposedSubject(@PathVariable id: Long): TeacherStudentProposedSubjectDetailsDto = TODO()

    @Operation(summary = "Akceptacja tematu zaproponowanego przez studenta/ów")
    @GetMapping("/student-propositions/accept/{id}")
    fun acceptProposedSubject(@PathVariable id: Long): Unit = TODO()

    @Operation(summary = "Odrzucenie tematu zaproponowanego przez studenta/ów")
    @GetMapping("/student-propositions/reject/{id}")
    fun rejectProposedSubject(@PathVariable id: Long): Unit = TODO()

    @Operation(summary = "Tematy do poprawy")
    @GetMapping("/to-correct")
    fun getSubjectsToCorrect(): List<TeacherSubjectDto> = TODO()

    @Operation(summary = "Szczegóły tematu do poprawy")
    @GetMapping("/to-correct/{id}")
    fun getSubjectToCorrect(@PathVariable id: Long): TeacherSubjectToCorrectDetailsDto = TODO()

    @Operation(summary = "Poprawienie tematu oznaczonego jako do poprawy")
    @PostMapping("/to-correct")
    fun correctSubject(@RequestBody form: TeacherTopicCorrectionForm): Unit = TODO()
}