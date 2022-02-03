package pwr.diplomaproject.controller

import io.swagger.v3.oas.annotations.Operation
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import pwr.diplomaproject.model.dto.StudentSubjectDetailsDto
import pwr.diplomaproject.model.dto.StudentSubjectDto

@RestController
@RequestMapping("/student/subject")
class StudentSubjectController {

    @Operation(summary = "Dostępne tematy do zarezerwowania przez zalogowanego studenta")
    @GetMapping("/available")
    fun getAvailableSubjects(): List<StudentSubjectDto> = TODO()

    @Operation(summary = "Propozycje tematów złożone przez zalogowanego studenta")
    @GetMapping("/proposed")
    fun getProposedSubjects(): List<StudentSubjectDto> = TODO()

    @Operation(summary = "Dane tematu")
    @GetMapping("/{id}")
    fun getSubject(@PathVariable id: Long): StudentSubjectDetailsDto = TODO()
}