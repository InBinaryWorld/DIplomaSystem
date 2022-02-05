package pwr.diplomaproject.controller

import io.swagger.v3.oas.annotations.Operation
import org.springframework.web.bind.annotation.*
import pwr.diplomaproject.model.dto.StudentSubjectDetailsDto
import pwr.diplomaproject.model.dto.SubjectDto
import pwr.diplomaproject.model.form.StudentSubjectPropositionForm
import pwr.diplomaproject.service.StudentSubjectService

@RestController
@RequestMapping("/student/subject")
class StudentSubjectController(
    private val studentSubjectService: StudentSubjectService
) {

    @Operation(summary = "Dostępne tematy do zarezerwowania przez zalogowanego studenta")
    @GetMapping("/available")
    fun getAvailableSubjects(@RequestParam studentId: Long): List<SubjectDto> =
        studentSubjectService.getAvailableSubjects(studentId)

    @Operation(summary = "Propozycje tematów złożone przez zalogowanego studenta")
    @GetMapping("/proposed")
    fun getProposedSubjects(@RequestParam studentId: Long): List<SubjectDto> =
        studentSubjectService.getProposedSubjects(studentId)

    @Operation(summary = "Szczegóły tematu")
    @GetMapping("/{id}")
    fun getSubject(@PathVariable id: Long): StudentSubjectDetailsDto = TODO()

    @Operation(summary = "Dodanie propozycji tematu przez studenta")
    @PostMapping("/propose")
    fun proposeSubject(
        @RequestParam studentId: Long,
        @RequestBody form: StudentSubjectPropositionForm
    ): Unit = TODO()

    @Operation(summary = "Usunięcie propozycji tematu studenta")
    @DeleteMapping("/proposed/{id}")
    fun deleteProposedSubject(@PathVariable id: Long): Unit = TODO()
}