package pwr.diplomaproject.controller

import io.swagger.v3.oas.annotations.Operation
import org.springframework.web.bind.annotation.*
import pwr.diplomaproject.model.dto.StudentSubjectDetailsDto
import pwr.diplomaproject.model.dto.StudentSubjectDto
import pwr.diplomaproject.model.form.StudentSubjectPropositionForm

@RestController
@RequestMapping("/student/subject")
class StudentSubjectController {

    @Operation(summary = "Dostępne tematy do zarezerwowania przez zalogowanego studenta")
    @GetMapping("/available")
    fun getAvailableSubjects(): List<StudentSubjectDto> = TODO()

    @Operation(summary = "Propozycje tematów złożone przez zalogowanego studenta")
    @GetMapping("/proposed")
    fun getProposedSubjects(): List<StudentSubjectDto> = TODO()

    @Operation(summary = "Szczegóły tematu")
    @GetMapping("/{id}")
    fun getSubject(@PathVariable id: Long): StudentSubjectDetailsDto = TODO()

    @Operation(summary = "Dodanie propozycji tematu przez studenta")
    @PostMapping("/propose")
    fun proposeSubject(@RequestBody form: StudentSubjectPropositionForm): Unit = TODO()

    @Operation(summary = "Usunięcie propozycji tematu studenta")
    @DeleteMapping("/proposed/{id}")
    fun deleteProposedSubject(@PathVariable id: Long): Unit = TODO()
}