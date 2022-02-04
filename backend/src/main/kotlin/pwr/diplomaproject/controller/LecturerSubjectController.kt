package pwr.diplomaproject.controller

import io.swagger.v3.oas.annotations.Operation
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import pwr.diplomaproject.model.dto.LecturerSubjectToCorrectDetailsDto
import pwr.diplomaproject.model.dto.SubjectDetailsDto
import pwr.diplomaproject.model.dto.SubjectDto
import pwr.diplomaproject.model.form.LecturerNewTopicForm
import pwr.diplomaproject.model.form.LecturerTopicCorrectionForm
import pwr.diplomaproject.service.LecturerSubjectService
import pwr.diplomaproject.util.userId
import java.security.Principal

@RestController
@RequestMapping("/lecturer/subject")
class LecturerSubjectController @Autowired constructor(
    private val lecturerSubjectService: LecturerSubjectService
){

    @Operation(summary = "Zgłoszone tematy przez prowadzącego")
    @GetMapping("/proposed")
    fun getProposedSubjects(principal: Principal): List<SubjectDto> =
        lecturerSubjectService.getProposedSubjects(principal.userId)

    @Operation(summary = "Szczegóły tematu zgłoszonego przez prowadzącego")
    @GetMapping("/proposed/{id}")
    fun getProposedSubject(@PathVariable id: Long): SubjectDetailsDto =
        lecturerSubjectService.getProposedSubject(id)

    @Operation(summary = "Zgłoszenie tematu pracy przez prowadzącego")
    @PostMapping
    fun proposeSubject(
        principal: Principal,
        @RequestBody form: LecturerNewTopicForm): Unit =
        lecturerSubjectService.proposeSubject(principal.userId, form)

    @Operation(summary = "Propozycje studentów tematów z udziałem prowadzącego")
    @GetMapping("/student-propositions")
    fun getStudentProposedSubjects(principal: Principal): List<SubjectDto> =
        lecturerSubjectService.getStudentProposedSubjects(principal.userId)

    @Operation(summary = "Szczegóły propozycji tematu studentów")
    @GetMapping("/student-propositions/{id}")
    fun getStudentProposedSubject(@PathVariable id: Long): SubjectDetailsDto =
        lecturerSubjectService.getStudentProposedSubject(id)

    @Operation(summary = "Akceptacja tematu zaproponowanego przez studenta/ów")
    @GetMapping("/student-propositions/accept/{id}")
    fun acceptProposedSubject(
        principal: Principal,
        @PathVariable id: Long): Unit =
        lecturerSubjectService.acceptProposedSubject(principal.userId, id)

    @Operation(summary = "Odrzucenie tematu zaproponowanego przez studenta/ów")
    @GetMapping("/student-propositions/reject/{id}")
    fun rejectProposedSubject(
        principal: Principal,
        @PathVariable id: Long): Unit =
        lecturerSubjectService.rejectProposedSubject(principal.userId, id)

    @Operation(summary = "Tematy do poprawy")
    @GetMapping("/to-correct")
    fun getSubjectsToCorrect(principal: Principal): List<SubjectDto> =
        lecturerSubjectService.getSubjectsToCorrect(principal.userId)

    @Operation(summary = "Szczegóły tematu do poprawy")
    @GetMapping("/to-correct/{id}")
    fun getSubjectToCorrect(
        principal: Principal,
        @PathVariable id: Long): LecturerSubjectToCorrectDetailsDto =
        lecturerSubjectService.getSubjectToCorrect(principal.userId, id)

    @Operation(summary = "Poprawienie tematu oznaczonego jako do poprawy")
    @PostMapping("/to-correct")
    fun correctSubject(
        principal: Principal,
        @RequestBody form: LecturerTopicCorrectionForm): Unit =
        lecturerSubjectService.correctSubject(principal.userId, form)
}